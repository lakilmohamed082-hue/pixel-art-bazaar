import alpine from "@/assets/alpine.jpg";
import foxline from "@/assets/foxline.jpg";
import sunset from "@/assets/sunset.jpg";
import skull from "@/assets/skull.jpg";
import wave from "@/assets/wave.jpg";
import leaf from "@/assets/leaf.jpg";
import crown from "@/assets/crown.jpg";
import bolt from "@/assets/bolt.jpg";

export type Product = { id: string; name: string; by: string; price: number; img: string };

export const products: Product[] = [
  { id: "alpine-vibes", name: "Alpine Vibes", by: "Neon Thread Co.", price: 24, img: alpine },
  { id: "foxline", name: "Foxline", by: "Pixel & Stitch", price: 32, img: foxline },
  { id: "sunset", name: "Sunset", by: "RetroInk Studio", price: 22, img: sunset },
  { id: "cyber-skull", name: "Cyber Skull", by: "Neon Thread Co.", price: 34, img: skull },
  { id: "ocean-wave", name: "Ocean Wave", by: "Pixel & Stitch", price: 26, img: wave },
  { id: "evergreen-leaf", name: "Evergreen Leaf", by: "RetroInk Studio", price: 23, img: leaf },
  { id: "royal-crown", name: "Royal Crown", by: "Neon Thread Co.", price: 29, img: crown },
  { id: "red-bolt", name: "Red Bolt", by: "Pixel & Stitch", price: 25, img: bolt },
];

export const SIZES = ["S", "M", "L", "XL"] as const;
export const getProduct = (id: string) => products.find((p) => p.id === id);
