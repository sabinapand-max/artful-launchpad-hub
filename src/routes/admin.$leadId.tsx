import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { fetchLead, type LeadRow } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";

const PW_KEY = "admin_pw";

export const Route = createFileRoute("/admin/$leadId")({
  head: () => ({
    meta: [
      { title: "Admin — Lead detail" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LeadDetailPage,
});

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-sm text-foreground break-words">{children}</div>
    </div>
  );
}

function LeadDetailPage() {
  const { leadId } = Route.useParams();
  const navigate = useNavigate();
  const fetchFn = useServerFn(fetchLead);
  const [row, setRow] = useState<LeadRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pw = typeof window !== "undefined" ? sessionStorage.getItem(PW_KEY) : null;
    if (!pw) {
      navigate({ to: "/admin" });
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetchFn({ data: { password: pw, id: leadId } });
        if (cancelled) return;
        if (!res.ok) {
          if (res.error === "Unauthorized") {
            sessionStorage.removeItem(PW_KEY);
            navigate({ to: "/admin" });
            return;
          }
          setError(res.error);
        } else {
          setRow(res.row);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Request failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [leadId, fetchFn, navigate]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between gap-3">
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to leads
          </Link>
          {row && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(row.contact)}
            >
              Copy contact
            </Button>
          )}
        </div>

        {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {row && (
          <div className="space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
            <div>
              <h1 className="text-2xl font-semibold">Lead detail</h1>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{row.id}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Contact">{row.contact}</Field>
              <Field label="Language">{row.lang ?? "—"}</Field>
              <Field label="Created">
                {new Date(row.created_at).toLocaleString()}
                <span className="ml-2 text-xs text-muted-foreground">
                  ({new Date(row.created_at).toISOString()})
                </span>
              </Field>
              <Field label="User agent">
                <span className="font-mono text-xs">{row.user_agent ?? "—"}</span>
              </Field>
            </div>

            <Field label="Requested services">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{row.services}</p>
            </Field>
          </div>
        )}
      </div>
    </div>
  );
}
