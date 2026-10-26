import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Percent } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { useAuth } from "@/hooks/useAuth";
import { useStore } from "@/lib/store";
import { PAYPAL_EMAIL } from "@/lib/checkout";
import { products } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — ThreadPixel Marketplace" },
      { name: "description", content: "ThreadPixel store administration." },
      { property: "og:title", content: "Admin — ThreadPixel Marketplace" },
      { property: "og:description", content: "ThreadPixel store administration." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const { user, role, isAdmin } = useAuth();
  const { wa } = useStore();
  return (
    <div className="mx-auto min-h-screen max-w-7xl p-3 md:p-6">
      <SiteHeader />
      <main className="mt-6 space-y-4 rounded-2xl border bg-card p-6">
        <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        {!user ? (
          <p className="text-sm">Please <Link to="/auth" search={{ mode: "login" }} className="font-bold text-primary">log in</Link>.</p>
        ) : role === null ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : !isAdmin ? (
          <p className="text-sm">This page is for the store admin only.</p>
        ) : (
          <>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4" />PayPal: {PAYPAL_EMAIL}</p>
              <p className="flex items-center gap-2"><MessageCircle className="h-4 w-4" />WhatsApp: +{wa}</p>
              <p className="flex items-center gap-2"><Percent className="h-4 w-4" />25% Commission</p>
            </div>
            <h2 className="pt-2 font-bold">Products ({products.length})</h2>
            <ul className="divide-y text-sm">
              {products.map((p) => (
                <li key={p.id} className="flex justify-between py-2"><span>{p.name} — {p.by}</span><span className="font-bold">${p.price}</span></li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}
