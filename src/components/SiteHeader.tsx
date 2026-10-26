import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, ShoppingCart, X, LogOut, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import { cartTotal, paypalUrl, whatsappUrl } from "@/lib/checkout";

const nav = ["Marketplace", "Sellers", "AI Tools", "Orders", "Analytics"];

export function SiteHeader() {
  const { cart, count, remove, wa } = useStore();
  const { user, role, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between gap-3 rounded-2xl border bg-card px-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand text-lg font-extrabold text-primary-foreground">M</div>
          <span className="truncate text-xl font-extrabold tracking-tight">Mart.Designs</span>
        </Link>
        <nav className="hidden gap-2 xl:flex">
          {nav.map((n, i) => (
            <span key={n} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${i === 0 ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>{n}</span>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={() => setOpen(true)} aria-label="Cart" className="relative grid h-10 w-10 place-items-center rounded-lg bg-secondary">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{count}</span>}
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden rounded-lg bg-accent px-2 py-1 text-xs font-bold capitalize text-accent-foreground sm:inline">{role ?? "…"}</span>
              <button onClick={() => signOut()} aria-label="Sign out" className="grid h-10 w-10 place-items-center rounded-lg bg-secondary"><LogOut className="h-4 w-4" /></button>
            </div>
          ) : (
            <>
              <Link to="/auth" search={{ mode: "login" }} className="rounded-lg bg-secondary px-3 py-2 text-sm font-semibold">Login</Link>
              <Link to="/auth" search={{ mode: "signup" }} className="hidden rounded-lg bg-secondary px-3 py-2 text-sm font-semibold sm:inline">Sign up</Link>
            </>
          )}
          <a href={`https://wa.me/${wa}?text=${encodeURIComponent("Hello! I want to request 50 custom logos.")}`} className="hidden items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-bold text-primary-foreground md:flex">
            <Plus className="h-4 w-4" /> Request 50 Logos
          </a>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-background/70" onClick={() => setOpen(false)}>
          <aside className="flex h-full w-full max-w-sm flex-col border-l bg-card p-4" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Your Cart ({count})</h2>
              <button onClick={() => setOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto">
              {cart.length === 0 && <p className="text-sm text-muted-foreground">Your cart is empty.</p>}
              {cart.map((l) => (
                <div key={l.id + l.size} className="flex items-center justify-between gap-2 rounded-lg bg-muted p-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{l.name}</p>
                    <p className="text-xs text-muted-foreground">Size {l.size} × {l.qty}</p>
                  </div>
                  <span className="font-bold">${(l.price * l.qty).toFixed(2)}</span>
                  <button onClick={() => remove(l.id, l.size)} aria-label="Remove"><Trash2 className="h-4 w-4 text-muted-foreground" /></button>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-lg font-extrabold"><span>Total</span><span>${cartTotal(cart).toFixed(2)}</span></div>
              <a aria-disabled={!cart.length} href={cart.length ? paypalUrl(cart) : undefined} className={`block rounded-xl bg-primary py-3 text-center font-bold text-primary-foreground ${cart.length ? "" : "pointer-events-none opacity-50"}`}>Checkout with PayPal</a>
              <a href={cart.length ? whatsappUrl(cart, wa) : undefined} target="_blank" rel="noreferrer" className={`block rounded-xl bg-success py-3 text-center font-bold text-background ${cart.length ? "" : "pointer-events-none opacity-50"}`}>Order via WhatsApp</a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
