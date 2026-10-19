const sharp = require('sharp');
const path = require('path');

const svgPath = path.join(__dirname, '../app/icon.svg');
const publicFavicon = path.join(__dirname, '../public/favicon.ico');
const appIconPng = path.join(__dirname, '../app/icon.png');

async function generateFavicons() {
  try {
    console.log("Rendering PNG favicon images from SVG...");
    
    // Render 32x32 PNG to overwrite old public/favicon.ico
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(publicFavicon);
    console.log("- Created public/favicon.ico (32x32)");

    // Render 512x512 PNG to app/icon.png
    await sharp(svgPath)
      .resize(512, 512)
      .png()
      .toFile(appIconPng);
    console.log("- Created app/icon.png (512x512)");

    console.log("Favicon generation completed successfully!");
  } catch (err) {
    console.error("Error generating favicons:", err);
  }
}

generateFavicons();
