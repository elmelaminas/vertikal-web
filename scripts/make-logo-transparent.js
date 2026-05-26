const sharp = require("sharp");
const path = require("path");

const INPUT  = path.join(__dirname, "..", "public", "logo-vertikal.png");
const OUTPUT = path.join(__dirname, "..", "public", "logo-vertikal-transparent.png");

async function makeTransparent() {
  const image = sharp(INPUT);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels; // 4 (RGBA)
  const pixels = new Uint8ClampedArray(data);

  // Pixels whose RGB are all >= THRESHOLD are treated as background white → transparent
  const THRESHOLD = 235;

  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD) {
      pixels[i + 3] = 0; // alpha = 0
    }
  }

  await sharp(Buffer.from(pixels.buffer), {
    raw: { width: info.width, height: info.height, channels },
  })
    .png()
    .toFile(OUTPUT);

  console.log(`✅  Logo transparente generado: ${OUTPUT}`);
  console.log(`    Dimensiones: ${info.width}×${info.height}`);
}

makeTransparent().catch((err) => {
  console.error("❌  Error:", err);
  process.exit(1);
});
