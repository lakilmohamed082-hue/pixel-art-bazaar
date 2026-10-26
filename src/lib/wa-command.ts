// Parses "بدل النمرة ل +212..." and returns the new number digits, or null.
export function parseWaCommand(text: string): string | null {
  if (!/بدل/.test(text) || !/(النمرة|النمر|الرقم|نمرة|رقم)/.test(text)) return null;
  const m = text.match(/\+?\s*(\d[\d\s-]{7,})/);
  if (!m?.[1]) return null;
  const digits = m[1].replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15 ? digits : null;
}
