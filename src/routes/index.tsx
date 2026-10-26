import { createFileRoute } from "@tanstack/react-router";
import {
  Plus, Search, Bell, LayoutGrid, Shirt, Users, ShoppingCart, Sparkles, Mail,
  MessageCircle, Percent, TrendingUp, Star, ArrowRight, BadgeCheck,
} from "lucide-react";
import alpine from "@/assets/alpine.jpg";
import foxline from "@/assets/foxline.jpg";
import sunset from "@/assets/sunset.jpg";
import skull from "@/assets/skull.jpg";
import wave from "@/assets/wave.jpg";
import leaf from "@/assets/leaf.jpg";
import crown from "@/assets/crown.jpg";
import bolt from "@/assets/bolt.jpg";
import { useEffect, useState } from "react";
import { MartChat } from "@/components/MartChat";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mart.Designs — Logo Marketplace for T-shirts & Hoodies" },
      { name: "description", content: "Buy custom AI-upscaled logo designs for t-shirts and hoodies from top sellers." },
      { property: "og:title", content: "Mart.Designs — Logo Marketplace" },
      { property: "og:description", content: "Custom AI-upscaled logos for t-shirts & hoodies." },
    ],
  }),
  component: Index,
});

const nav = ["Marketplace", "Sellers", "AI Tools", "Orders", "Analytics"];
const side = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: Shirt, label: "Products" },
  { icon: Users, label: "Sellers", badge: "12" },
  { icon: ShoppingCart, label: "Orders", badge: "8" },
  { icon: Sparkles, label: "AI Upscaler", badge: "NEW" },
];
const stats = [
  { label: "Active Sellers", value: "128", note: "12 this week" },
  { label: "AI Upscaled", value: "2.4k", note: "AI Upscaler • Enabled" },
  { label: "Revenue", value: "$8,932", note: "+18.2% vs last month" },
];
const sellers = [
  { name: "Neon Thread Co.", handle: "@neonthread", meta: "Top Seller • 4.9 (120 sales)" },
  { name: "Pixel & Stitch", handle: "@pixelandstitch", meta: "Verified • 4.8 (89 sales)" },
  { name: "RetroInk Studio", handle: "@retroink", meta: "New • 4.7 (32 sales)" },
];
const products = [
  { name: "Alpine Vibes", by: "Neon Thread Co.", price: "$24", img: alpine },
  { name: "Foxline", by: "Pixel & Stitch", price: "$32", img: foxline },
  { name: "Sunset", by: "RetroInk Studio", price: "$22", img: sunset },
  { name: "Cyber Skull", by: "Neon Thread Co.", price: "$34", img: skull },
  { name: "Ocean Wave", by: "Pixel & Stitch", price: "$26", img: wave },
  { name: "Evergreen Leaf", by: "RetroInk Studio", price: "$23", img: leaf },
  { name: "Royal Crown", by: "Neon Thread Co.", price: "$29", img: crown },
  { name: "Red Bolt", by: "Pixel & Stitch", price: "$25", img: bolt },
];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-lg font-extrabold text-primary-foreground">M</div>
      <span className="text-xl font-extrabold tracking-tight">Mart.Designs</span>
    </div>
  );
}

function Index() {
  const [wa, setWa] = useState("212701761970");
  useEffect(() => { const s = localStorage.getItem("wa"); if (s) setWa(s); }, []);
  const changeWa = (n: string) => { setWa(n); localStorage.setItem("wa", n); };
  return (
    <div className="min-h-screen p-3 md:p-6">
      <header className="flex items-center justify-between gap-3 rounded-2xl border bg-card px-4 py-3">
        <Logo />
        <nav className="hidden gap-2 lg:flex">
          {nav.map((n, i) => (
            <button key={n} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${i === 0 ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>{n}</button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Search className="hidden h-5 w-5 sm:block" />
          <Bell className="hidden h-5 w-5 sm:block" />
          <button className="flex shrink-0 items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">
            <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Request</span> 50 Logos
          </button>
        </div>
      </header>

      <div className="mt-4 grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border bg-card p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Admin Panel</p>
            <ul className="grid grid-cols-2 gap-1 lg:grid-cols-1">
              {side.map(({ icon: Icon, label, badge, active }) => (
                <li key={label} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold ${active ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{label}</span>
                  {badge && <span className="rounded bg-accent px-1.5 text-[10px] font-bold text-accent-foreground">{badge}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3 rounded-2xl border bg-card p-4 text-sm">
            <div>
              <p className="font-bold">PayPal Integrated</p>
              <p className="text-xs text-success">Connected • Payouts enabled</p>
            </div>
            <p className="flex items-center gap-2 break-all text-muted-foreground"><Mail className="h-4 w-4 shrink-0" />analakil2005@gmail.com</p>
            <a href={`https://wa.me/${wa}`} className="flex items-center gap-2 text-muted-foreground"><MessageCircle className="h-4 w-4 shrink-0" />WA +{wa}</a>
            <p className="flex items-center gap-2 font-semibold"><Percent className="h-4 w-4 shrink-0 text-primary" />25% Commission</p>
          </div>
        </aside>

        <main className="min-w-0 space-y-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold md:text-4xl">Logo Marketplace</h1>
              <p className="mt-1 text-sm text-muted-foreground">Custom logo designs for t-shirts & hoodies — powered by AI upscaler</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border bg-card p-3">
                  <p className="text-xs font-semibold text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-extrabold md:text-2xl">{s.value}</p>
                  <p className="flex items-center gap-1 text-[10px] text-success"><TrendingUp className="h-3 w-3" />{s.note}</p>
                </div>
              ))}
            </div>
          </div>

          <section>
            <h2 className="mb-3 text-xl font-bold">Featured Sellers</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {sellers.map((s) => (
                <div key={s.name} className="flex items-center gap-3 rounded-xl border bg-card p-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand font-extrabold text-primary-foreground">{s.name[0]}</div>
                  <div className="min-w-0">
                    <p className="truncate font-bold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.handle}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3 w-3" />{s.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-bold">T-shirt & Hoodie Mockups</h2>
              <span className="flex items-center gap-1 rounded-lg bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground"><Sparkles className="h-3 w-3" />4x Upscale Ready</span>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {products.map((p) => (
                <article key={p.name} className="overflow-hidden rounded-md border bg-background">
                  <img src={p.img} alt={`${p.name} logo mockup`} loading="lazy" width={896} height={752} className="aspect-[6/5] w-full object-cover" />
                  <div className="space-y-1.5 p-3">
                    <h3 className="truncate font-bold">{p.name}</h3>
                    <p className="truncate text-xs text-muted-foreground">by {p.by}</p>
                    <span className="inline-flex items-center gap-1 rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold text-accent-foreground"><BadgeCheck className="h-3 w-3" />AI Upscaled 4x</span>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-extrabold">{p.price}</span>
                      <span className="text-[10px] text-muted-foreground">PayPal • Card</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border bg-banner p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="h-8 w-8 shrink-0 text-primary" />
          <div>
            <p className="text-xl font-extrabold">Need 50 custom logos fast?</p>
            <p className="text-sm text-muted-foreground">Bulk request — 50 unique logo concepts delivered in 48h.</p>
          </div>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground md:w-auto">
          Request 50 Logos <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <MartChat onChangeWa={changeWa} />
    </div>
  );
}
