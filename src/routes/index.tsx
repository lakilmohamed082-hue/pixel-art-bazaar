import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Star, TrendingUp } from "lucide-react";
import { products } from "@/lib/products";
import { SiteHeader } from "@/components/SiteHeader";
import { useStore } from "@/lib/store";

type Search = { q?: string | undefined };

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s["q"] === "string" && s["q"] ? (s["q"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "ThreadPixel Marketplace — Logo T-shirts & Hoodies" },
      { name: "description", content: "Shop custom logo designs for t-shirts and hoodies from independent sellers." },
      { property: "og:title", content: "ThreadPixel Marketplace" },
      { property: "og:description", content: "Custom logo designs for t-shirts & hoodies." },
    ],
  }),
  component: Index,
});

const stats = [
  { label: "Active Sellers", value: "128", note: "12 this week" },
  { label: "Designs", value: "2.4k", note: "Print-ready" },
  { label: "Orders", value: "8.9k", note: "+18% this month" },
];
const sellers = [
  { name: "Neon Thread Co.", handle: "@neonthread", meta: "Top Seller • 4.9" },
  { name: "Pixel & Stitch", handle: "@pixelandstitch", meta: "Verified • 4.8" },
  { name: "RetroInk Studio", handle: "@retroink", meta: "New • 4.7" },
];

function Index() {
  const { q } = Route.useSearch();
  const { wa } = useStore();
  const list = q ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())) : products;

  return (
    <div className="mx-auto min-h-screen max-w-7xl p-3 md:p-6">
      <SiteHeader />
      <main className="mt-6 space-y-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-extrabold md:text-4xl">Logo Marketplace</h1>
            <p className="mt-1 text-sm text-muted-foreground">Custom logo designs for t-shirts & hoodies</p>
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

        <section id="products">
          <h2 className="mb-3 text-xl font-bold">{q ? `Results for “${q}”` : "T-shirt & Hoodie Designs"}</h2>
          {list.length === 0 && <p className="text-sm text-muted-foreground">No designs found. <Link to="/" search={{}} className="font-semibold text-primary">Show all</Link></p>}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {list.map((p) => (
              <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="cursor-pointer overflow-hidden rounded-md border bg-background">
                <img src={p.img} alt={`${p.name} design`} loading="lazy" width={896} height={752} className="aspect-[6/5] w-full object-cover" />
                <div className="space-y-1 p-3">
                  <h3 className="truncate font-bold">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.category}</p>
                  <p className="text-lg font-extrabold">${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border bg-banner p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="h-8 w-8 shrink-0 text-primary" />
          <div>
            <p className="text-xl font-extrabold">Need 50 custom logos fast?</p>
            <p className="text-sm text-muted-foreground">Bulk request — 50 unique logo concepts delivered in 48h.</p>
          </div>
        </div>
        <a href={`https://wa.me/${wa}?text=${encodeURIComponent("Hello! I want to request 50 custom logos.")}`} target="_blank" rel="noreferrer" className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground md:w-auto">
          Request 50 Logos <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
