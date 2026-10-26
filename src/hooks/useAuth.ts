import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type Role = "buyer" | "seller" | "admin";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const load = async (u: User | null) => {
      setUser(u);
      if (!u) return setRole(null);
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.id);
      const roles = (data ?? []).map((r) => r.role as Role);
      setRole(roles.includes("admin") ? "admin" : roles.includes("seller") ? "seller" : "buyer");
    };
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { void load(s?.user ?? null); });
    supabase.auth.getUser().then(({ data }) => load(data.user));
    return () => sub.subscription.unsubscribe();
  }, []);

  return { user, role, isAdmin: role === "admin", signOut: () => supabase.auth.signOut() };
}
