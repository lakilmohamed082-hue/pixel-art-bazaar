import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { LOGIN_MESSAGES, loginErrorMessage } from "@/lib/auth-errors";

type Search = { mode: "login" | "signup" };

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): Search => ({ mode: s["mode"] === "signup" ? "signup" : "login" }),
  head: () => ({
    meta: [
      { title: "Login or Sign up — ThreadPixel Marketplace" },
      { name: "description", content: "Sign in to ThreadPixel Marketplace as a buyer or seller." },
      { property: "og:title", content: "Login — ThreadPixel Marketplace" },
      { property: "og:description", content: "Sign in to ThreadPixel Marketplace as a buyer or seller." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [msg, setMsg] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null); setInfo(null);
    if (!email.trim() || !password) { setMsg(LOGIN_MESSAGES.empty); return; }
    setBusy(true);
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email, password, options: { emailRedirectTo: window.location.origin, data: { role } },
      });
      if (error) setMsg(error.message);
      else if (!data.session) setInfo("Check your email to confirm your account.");
      else navigate({ to: "/" });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        const { data: exists } = await supabase.rpc("email_exists", { _email: email });
        setMsg(loginErrorMessage(error.message, !!exists));
      } else navigate({ to: "/" });
    }
    setBusy(false);
  };

  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) setMsg(r.error.message);
    else if (!r.redirected) navigate({ to: "/" });
  };

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <div className="w-full max-w-sm space-y-4 rounded-2xl border bg-card p-6">
        <Link to="/" className="text-xl font-extrabold">ThreadPixel Marketplace</Link>
        <h1 className="text-2xl font-bold">{mode === "signup" ? "Create account" : "Welcome back"}</h1>
        <form onSubmit={submit} noValidate className="space-y-3">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg bg-muted px-3 py-2.5 outline-none" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg bg-muted px-3 py-2.5 outline-none" />
          {mode === "signup" && (
            <div className="grid grid-cols-2 gap-2">
              {(["buyer", "seller"] as const).map((r) => (
                <button type="button" key={r} onClick={() => setRole(r)} className={`cursor-pointer rounded-lg py-2 text-sm font-semibold capitalize ${role === r ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{r}</button>
              ))}
            </div>
          )}
          {msg && <div role="alert" className="rounded-lg border border-destructive bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive">{msg}</div>}
          {info && <div className="rounded-lg bg-accent px-3 py-2 text-sm text-accent-foreground">{info}</div>}
          <button disabled={busy} className="w-full cursor-pointer rounded-lg bg-primary py-2.5 font-bold text-primary-foreground disabled:opacity-50">{mode === "signup" ? "Sign up" : "Login"}</button>
        </form>
        <button onClick={google} className="w-full cursor-pointer rounded-lg bg-secondary py-2.5 font-semibold">Continue with Google</button>
        <p className="text-sm text-muted-foreground">
          {mode === "signup" ? "Have an account? " : "New here? "}
          <Link to="/auth" search={{ mode: mode === "signup" ? "login" : "signup" }} className="font-semibold text-primary">{mode === "signup" ? "Login" : "Sign up"}</Link>
        </p>
        <Link to="/" className="block text-sm text-muted-foreground">← Continue as guest</Link>
      </div>
    </div>
  );
}
