const sharp = require("sharp");
const path = require("path");

const INPUT  = path.join(__dirname, "..", "public", "logo-vertikal.png");
const OUTPUT = path.join(__dirname, "..", "public", "logo-vertikal-transparent.png");

async function makeTransparent() {
  const image = sharp(INPUT);
  const metadata = await image.metadata();
  console.log(`Procesando: ${metadata.width}x${metadata.height}, channels: ${metadata.channels}, format: ${metadata.format}`);

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels; // 4 (RGBA)
  const pixels = new Uint8ClampedArray(data);
  const totalPixels = info.width * info.height;
  let transparentCount = 0;

  // Pixels cuyos RGB >= THRESHOLD se consideran fondo blanco → transparentes
  const THRESHOLD = 230;

  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD) {
      pixels[i + 3] = 0;
      transparentCount++;
    }
  }

  await sharp(Buffer.from(pixels.buffer), {
    raw: { width: info.width, height: info.height, channels },
  })
    .png({ compressionLevel: 8 })
    .toFile(OUTPUT);

  const pct = ((transparentCount / totalPixels) * 100).toFixed(1);
  console.log(`✅  Generado: ${OUTPUT}`);
  console.log(`    Pixeles totales:       ${totalPixels.toLocaleString()}`);
  console.log(`    Pixeles transparentes: ${transparentCount.toLocaleString()} (${pct}%)`);
  console.log(`    Pixeles del logo:      ${(totalPixels - transparentCount).toLocaleString()} (${(100 - parseFloat(pct)).toFixed(1)}%)`);

  if (transparentCount === 0) {
    console.error("❌  ERROR: 0 píxeles convertidos — el PNG puede no tener fondo blanco.");
    process.exit(1);
  }
  if (parseFloat(pct) < 30) {
    console.warn(`⚠️   Solo ${pct}% transparente — verifica que se eliminó el fondo correctamente.`);
  }
}

makeTransparent().catch((err) => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
