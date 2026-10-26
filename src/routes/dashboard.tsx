import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { useAuth } from "@/hooks/useAuth";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — ThreadPixel Marketplace" },
      { name: "description", content: "Your ThreadPixel account and seller details." },
      { property: "og:title", content: "My Dashboard — ThreadPixel Marketplace" },
      { property: "og:description", content: "Your ThreadPixel account and seller details." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user, role } = useAuth();
  const { wa } = useStore();
  return (
    <div className="mx-auto min-h-screen max-w-7xl p-3 md:p-6">
      <SiteHeader />
      <main className="mt-6 max-w-xl space-y-4 rounded-2xl border bg-card p-6">
        <h1 className="text-2xl font-extrabold">My Dashboard</h1>
        {!user ? (
          <p className="text-sm">Please <Link to="/auth" search={{ mode: "login" }} className="font-bold text-primary">log in</Link> to see your dashboard.</p>
        ) : (
          <div className="space-y-2 text-sm">
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Account type:</span> <span className="capitalize">{role ?? "…"}</span></p>
            {(role === "seller" || role === "admin") && <p><span className="font-semibold">WhatsApp:</span> +{wa}</p>}
          </div>
        )}
      </main>
    </div>
  );
}
