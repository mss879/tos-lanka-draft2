const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'industries');
const files = ['automotive_electronics_v5.png', 'medical_electronics_v5.png'];

async function processImages() {
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.existsSync(filePath)) {
      const outPath = path.join(dir, file.replace('.png', '.webp'));
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(outPath);
      fs.unlinkSync(filePath);
      console.log(`Converted ${file} to WEBP and deleted original.`);
    }
  }
}
processImages();
