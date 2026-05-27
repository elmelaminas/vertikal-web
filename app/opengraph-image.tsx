import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VERTIKAL - Plataformas Elevables México";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #0A1628 0%, #1E4D8C 50%, #143866 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Logo */}
        <img
          src="https://vertikal-web.vercel.app/logo-vertikal.png"
          width={220}
          height={220}
          style={{ marginBottom: 28, borderRadius: 16 }}
        />

        {/* Título */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-2px",
            marginBottom: 12,
          }}
        >
          VERTIKAL
        </div>

        {/* Subtítulo */}
        <div
          style={{
            fontSize: 30,
            color: "#E87722",
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Plataformas Elevables México
        </div>

        {/* Descripción */}
        <div
          style={{
            fontSize: 22,
            color: "#B0C4DE",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Genie · JLG · Haulotte | Venta · Renta · Servicio · Refacciones
        </div>

        {/* Badge URL */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            fontSize: 18,
            color: "#FFFFFF",
            background: "rgba(255,255,255,0.15)",
            padding: "8px 24px",
            borderRadius: 100,
          }}
        >
          vertikal-web.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
