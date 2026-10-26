import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Plus, ShoppingCart, X, LogOut, Trash2, Search, User, Shield } from "lucide-react";
import { useStore } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import { cartTotal, paypalUrl, whatsappUrl } from "@/lib/checkout";

const iconBtn = "relative grid h-11 w-11 cursor-pointer place-items-center rounded-lg bg-secondary";

export function SiteHeader() {
  const { cart, count, remove, wa } = useStore();
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  const runSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/", search: { q: q.trim() || undefined }, hash: "products" });
    setSearchOpen(false);
  };

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-card px-4 py-3">
        <Link to="/" search={{}} className="flex min-w-0 items-center gap-2">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand text-lg font-extrabold text-primary-foreground">T</div>
          <span className="truncate text-xl font-extrabold tracking-tight">ThreadPixel Marketplace</span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={() => setSearchOpen((s) => !s)} aria-label="Search" className={iconBtn}><Search className="h-5 w-5" /></button>
          <button onClick={() => setOpen(true)} aria-label="Cart" className={iconBtn}>
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{count}</span>}
          </button>
          {user ? (
            <>
              <Link to="/dashboard" aria-label="My dashboard" className={iconBtn}><User className="h-5 w-5" /></Link>
              {isAdmin && <Link to="/admin" aria-label="Admin" className={iconBtn}><Shield className="h-5 w-5" /></Link>}
              <button onClick={() => { void signOut(); navigate({ to: "/" }); }} aria-label="Sign out" className={iconBtn}><LogOut className="h-5 w-5" /></button>
            </>
          ) : (
            <Link to="/auth" search={{ mode: "login" }} aria-label="Login" className={iconBtn}><User className="h-5 w-5" /></Link>
          )}
          <a href={`https://wa.me/${wa}?text=${encodeURIComponent("Hello! I want to request 50 custom logos.")}`} target="_blank" rel="noreferrer" className="flex cursor-pointer items-center gap-1 rounded-lg bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground">
            <Plus className="h-4 w-4" /> 50 Logos
          </a>
        </div>
        {searchOpen && (
          <form onSubmit={runSearch} className="flex w-full gap-2">
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search designs…" className="min-w-0 flex-1 rounded-lg bg-muted px-3 py-2.5 outline-none" />
            <button className="cursor-pointer rounded-lg bg-primary px-4 font-bold text-primary-foreground">Search</button>
          </form>
        )}
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-background/70" onClick={() => setOpen(false)}>
          <aside className="flex h-full w-full max-w-sm flex-col border-l bg-card p-4" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Your Cart ({count})</h2>
              <button onClick={() => setOpen(false)} aria-label="Close" className="cursor-pointer p-2"><X className="h-5 w-5" /></button>
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
                  <button onClick={() => remove(l.id, l.size)} aria-label="Remove" className="cursor-pointer p-2"><Trash2 className="h-4 w-4 text-muted-foreground" /></button>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-lg font-extrabold"><span>Total</span><span>${cartTotal(cart).toFixed(2)}</span></div>
              <a aria-disabled={!cart.length} href={cart.length ? paypalUrl(cart) : undefined} className={`block rounded-xl bg-primary py-3 text-center font-bold text-primary-foreground ${cart.length ? "" : "pointer-events-none opacity-50"}`}>Checkout with PayPal</a>
              <a aria-disabled={!cart.length} href={cart.length ? whatsappUrl(cart, wa) : undefined} target="_blank" rel="noreferrer" className={`block rounded-xl bg-success py-3 text-center font-bold text-background ${cart.length ? "" : "pointer-events-none opacity-50"}`}>Order via WhatsApp</a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
