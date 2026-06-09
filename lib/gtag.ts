// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

export function trackWhatsAppConversion() {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: "AW-18210776268/OndPCMGzkLwcEMzJyetD",
      value: 500.0,
      currency: "MXN",
    });
  }
}
