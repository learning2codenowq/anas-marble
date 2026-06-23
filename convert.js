const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = './images';
const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png'));

async function convertAll() {
    for (const file of files) {
        const inputPath = path.join(imagesDir, file);
        const outputPath = path.join(imagesDir, file.replace('.png', '.webp'));
        
        await sharp(inputPath)
            .webp({ quality: 82 })
            .toFile(outputPath);
        
        const originalSize = (fs.statSync(inputPath).size / 1024 / 1024).toFixed(2);
        const newSize = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
        console.log(`${file}: ${originalSize}MB → ${newSize}MB`);
    }
    console.log('Done!');
}

convertAll();