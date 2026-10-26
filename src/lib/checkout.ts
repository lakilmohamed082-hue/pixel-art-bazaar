export const PAYPAL_EMAIL = "analakil2005@gmail.com";
export const DEFAULT_WA = "212701761970";

export type CartLine = { id: string; name: string; price: number; size: string; qty: number };

export const cartTotal = (lines: CartLine[]) =>
  Math.round(lines.reduce((s, l) => s + l.price * l.qty, 0) * 100) / 100;

// PayPal Website Payments cart upload URL (works for 1+ items).
export function paypalUrl(lines: CartLine[], returnUrl?: string) {
  const p = new URLSearchParams({ cmd: "_cart", upload: "1", business: PAYPAL_EMAIL, currency_code: "USD" });
  lines.forEach((l, i) => {
    const n = i + 1;
    p.set(`item_name_${n}`, `${l.name} T-shirt (${l.size})`);
    p.set(`amount_${n}`, l.price.toFixed(2));
    p.set(`quantity_${n}`, String(l.qty));
  });
  if (returnUrl) p.set("return", returnUrl);
  return `https://www.paypal.com/cgi-bin/webscr?${p.toString()}`;
}

export function whatsappUrl(lines: CartLine[], wa: string) {
  const body = lines.map((l) => `• ${l.name} T-shirt — Size ${l.size} × ${l.qty} = $${(l.price * l.qty).toFixed(2)}`).join("\n");
  const text = `Hello Mart.Designs! I want to order:\n${body}\nTotal: $${cartTotal(lines).toFixed(2)}`;
  return `https://wa.me/${wa}?text=${encodeURIComponent(text)}`;
}
