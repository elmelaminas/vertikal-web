const sharp = require("sharp");
const path = require("path");

const INPUT = path.join(__dirname, "..", "public", "logo-vertikal.png");
const OUT_DIR = path.join(__dirname, "..", "app");
const PUBLIC_DIR = path.join(__dirname, "..", "public");

async function makeFavicons() {
  console.log("Generando favicons desde logo-vertikal.png...");

  await sharp(INPUT)
    .resize(32, 32, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(OUT_DIR, "icon.png"));
  console.log("✅ app/icon.png (32x32)");

  await sharp(INPUT)
    .resize(180, 180, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(OUT_DIR, "apple-icon.png"));
  console.log("✅ app/apple-icon.png (180x180)");

  await sharp(INPUT)
    .resize(192, 192, { fit: "contain", background: { r: 30, g: 77, b: 140, alpha: 1 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, "icon-192.png"));
  console.log("✅ public/icon-192.png (192x192 fondo azul VERTIKAL)");

  await sharp(INPUT)
    .resize(512, 512, { fit: "contain", background: { r: 30, g: 77, b: 140, alpha: 1 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, "icon-512.png"));
  console.log("✅ public/icon-512.png (512x512 fondo azul VERTIKAL)");

  console.log("\n✅ Todos los favicons generados correctamente.");
}

makeFavicons().catch(console.error);
