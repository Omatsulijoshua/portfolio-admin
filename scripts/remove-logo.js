const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = "C:/Users/SirBill's/.gemini/antigravity/brain/e7e1ed22-4269-4b2a-b296-ce36adfcb271/uploaded_media_1779360389418.png";
const outputDir = path.join(__dirname, '../public/images');
const outputPath = path.join(outputDir, 'emerald-logo-bg.png');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImage() {
  try {
    const metadata = await sharp(inputPath).metadata();
    
    // We'll crop the bottom 80 pixels and right 80 pixels where the logo usually is
    // Or we can just composite a dark box over it.
    // Let's composite a dark box #2D3035 over the bottom right corner.
    
    // The logo is usually in the bottom right 60x60 pixels.
    // Let's draw a dark box over the bottom-right 80x80 pixels.
    const box = Buffer.from(
      `<svg width="80" height="80">
        <rect x="0" y="0" width="80" height="80" fill="#24262b" />
      </svg>`
    );

    await sharp(inputPath)
      .composite([{ input: box, gravity: 'southeast' }])
      .toFile(outputPath);
      
    console.log("Image processed successfully and saved to:", outputPath);
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

processImage();
