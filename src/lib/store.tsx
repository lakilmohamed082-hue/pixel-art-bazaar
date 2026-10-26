import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_WA, type CartLine } from "./checkout";

type Store = {
  cart: CartLine[];
  add: (l: Omit<CartLine, "qty">) => void;
  remove: (id: string, size: string) => void;
  clear: () => void;
  count: number;
  wa: string;
  setWa: (n: string) => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wa, setWaState] = useState(DEFAULT_WA);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem("cart");
      if (c) setCart(JSON.parse(c));
      const w = localStorage.getItem("wa");
      if (w) setWaState(w);
    } catch { /* ignore */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("cart", JSON.stringify(cart)); }, [cart, ready]);

  const add: Store["add"] = (l) =>
    setCart((c) => {
      const i = c.findIndex((x) => x.id === l.id && x.size === l.size);
      if (i < 0) return [...c, { ...l, qty: 1 }];
      return c.map((x, j) => (j === i ? { ...x, qty: x.qty + 1 } : x));
    });
  const remove = (id: string, size: string) => setCart((c) => c.filter((x) => !(x.id === id && x.size === size)));
  const setWa = (n: string) => { setWaState(n); localStorage.setItem("wa", n); };

  return (
    <Ctx.Provider value={{ cart, add, remove, clear: () => setCart([]), count: cart.reduce((s, l) => s + l.qty, 0), wa, setWa }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside StoreProvider");
  return s;
}
