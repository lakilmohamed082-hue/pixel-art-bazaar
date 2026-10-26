import { describe, it, expect } from "vitest";
import { paypalUrl, whatsappUrl, cartTotal } from "./checkout";

const lines = [{ id: "foxline", name: "Foxline", price: 32, size: "L", qty: 2 }];

describe("checkout", () => {
  it("PayPal pays to the owner email", () => {
    const u = new URL(paypalUrl(lines));
    expect(u.searchParams.get("business")).toBe("analakil2005@gmail.com");
    expect(u.searchParams.get("amount_1")).toBe("32.00");
  });
  it("WhatsApp goes to the given number with details", () => {
    const u = whatsappUrl(lines, "212701761970");
    expect(u.startsWith("https://wa.me/212701761970?text=")).toBe(true);
    expect(decodeURIComponent(u)).toContain("Size L");
  });
  it("totals the cart", () => expect(cartTotal(lines)).toBe(64));
});
