const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Configuration
const INPUT_DIR = path.join(__dirname, 'img');
const OUTPUT_DIR = path.join(__dirname, 'img', 'optimized');
const QUALITY = 80; // Image quality (0-100)
const MAX_WIDTH = 1920; // Maximum width for resizing
const OVERWRITE = false; // Set to true to overwrite existing files

// Supported image formats
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.jpeg'];

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Skip if output exists and we're not overwriting
    if (!OVERWRITE && fs.existsSync(outputPath)) {
      const outputStats = await stat(outputPath);
      const inputStats = await stat(inputPath);
      
      // If output is smaller than input, skip
      if (outputStats.size < inputStats.size) {
        console.log(`Skipping (already optimized): ${path.relative(INPUT_DIR, inputPath)}`);
        return false;
      }
    }

    // Calculate new dimensions
    const width = Math.min(metadata.width, MAX_WIDTH);
    const options = {
      quality: QUALITY,
      effort: 6,
    };

    // Handle different image formats
    if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
      await image
        .resize({ width, withoutEnlargement: true })
        .jpeg({ ...options, mozjpeg: true })
        .toFile(outputPath);
    } else if (metadata.format === 'png') {
      await image
        .resize({ width, withoutEnlargement: true })
        .png({ ...options, compressionLevel: 9 })
        .toFile(outputPath);
    } else if (metadata.format === 'webp') {
      await image
        .resize({ width, withoutEnlargement: true })
        .webp(options)
        .toFile(outputPath);
    }

    console.log(`Optimized: ${path.basename(inputPath)}`);
    return true;
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
    return false;
  }
}

async function processDirectory(directory) {
  try {
    const files = await readdir(directory);
    
    for (const file of files) {
      const fullPath = path.join(directory, file);
      const relativePath = path.relative(INPUT_DIR, fullPath);
      const outputPath = path.join(OUTPUT_DIR, relativePath);
      const stats = await stat(fullPath);
      
      // Skip the optimized directory to prevent recursion
      if (relativePath.startsWith('optimized')) {
        continue;
      }
      
      if (stats.isDirectory()) {
        // Create corresponding directory in output
        if (!fs.existsSync(outputPath)) {
          fs.mkdirSync(outputPath, { recursive: true });
        }
        await processDirectory(fullPath);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          // Skip if output exists and we're not overwriting
          if (!OVERWRITE && fs.existsSync(outputPath)) {
            console.log(`Skipping (already exists): ${relativePath}`);
            continue;
          }
          
          // Ensure output directory exists
          const outputDir = path.dirname(outputPath);
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          
          await optimizeImage(fullPath, outputPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing ${directory}:`, error);
  }
}

async function optimizeImages() {
  console.log('Starting image optimization...');
  const startTime = Date.now();
  
  try {
    await processDirectory(INPUT_DIR);
    const endTime = Date.now();
    console.log(`\nOptimization completed in ${(endTime - startTime) / 1000} seconds`);
    console.log(`Optimized images are saved in: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error('Error during optimization:', error);
  }
}

// Run the optimization
optimizeImages();
