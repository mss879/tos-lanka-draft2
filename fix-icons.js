const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcFile = path.join(process.cwd(), 'public', 'tos-logo.png');
const outFile = path.join(process.cwd(), 'src', 'app', 'icon.png');

async function fixIcons() {
  try {
    // Generate a square app icon (512x512) from the logo using contain to avoid stretching
    await sharp(srcFile)
      .resize({ width: 512, height: 512, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(outFile);
    console.log('Created src/app/icon.png from tos-logo.png');

    // Remove old Next.js default things
    const toDelete = [
      path.join(process.cwd(), 'src', 'app', 'favicon.ico'),
      path.join(process.cwd(), 'public', 'next.svg'),
      path.join(process.cwd(), 'public', 'vercel.svg'),
      path.join(process.cwd(), 'public', 'file.svg'),
      path.join(process.cwd(), 'public', 'globe.svg'),
      path.join(process.cwd(), 'public', 'window.svg'),
    ];

    toDelete.forEach((file) => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`Deleted ${file}`);
      }
    });

  } catch (error) {
    console.error('Error:', error);
  }
}
fixIcons();
