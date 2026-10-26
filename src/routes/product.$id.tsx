import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { BadgeCheck, ShoppingCart } from "lucide-react";
import { getProduct, SIZES } from "@/lib/products";
import { useStore } from "@/lib/store";
import { paypalUrl, whatsappUrl } from "@/lib/checkout";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { id: p.id, name: p.name };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} T-shirt — Mart.Designs` : "Product — Mart.Designs" },
      { name: "description", content: "AI-upscaled logo T-shirt. Sizes S to XL. Pay with PayPal or order via WhatsApp." },
      { property: "og:title", content: loaderData ? `${loaderData.name} T-shirt` : "Mart.Designs product" },
      { property: "og:description", content: "AI-upscaled logo T-shirt from Mart.Designs." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useLoaderData();
  const p = getProduct(id)!;
  const { add, wa } = useStore();
  const [size, setSize] = useState<string>("M");
  const [added, setAdded] = useState(false);
  const line = { id: p.id, name: p.name, price: p.price, size, qty: 1 };

  return (
    <div className="min-h-screen p-3 md:p-6">
      <SiteHeader />
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <img src={p.img} alt={`${p.name} T-shirt`} width={896} height={752} className="w-full rounded-2xl border object-cover" />
        <div className="space-y-5">
          <div>
            <h1 className="text-3xl font-extrabold md:text-4xl">{p.name}</h1>
            <p className="text-muted-foreground">by {p.by}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded bg-accent px-2 py-1 text-xs font-bold text-accent-foreground"><BadgeCheck className="h-4 w-4" />AI Upscaled 4x</span>
          <p className="text-4xl font-extrabold">${p.price.toFixed(2)}</p>
          <div>
            <p className="mb-2 text-sm font-semibold">Size</p>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`h-12 w-14 rounded-lg font-bold ${size === s ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <button onClick={() => { add(line); setAdded(true); }} className="flex items-center justify-center gap-2 rounded-xl bg-secondary py-3 font-bold">
              <ShoppingCart className="h-5 w-5" /> {added ? "Added ✓ — add another" : "Add to Cart"}
            </button>
            <a href={paypalUrl([line])} className="rounded-xl bg-primary py-3 text-center font-bold text-primary-foreground">Buy Now with PayPal</a>
            <a href={whatsappUrl([line], wa)} target="_blank" rel="noreferrer" className="rounded-xl bg-success py-3 text-center font-bold text-background">Order via WhatsApp</a>
          </div>
          <p className="text-xs text-muted-foreground">No account needed — checkout as guest. PayPal • Card</p>
        </div>
      </div>
    </div>
  );
}
