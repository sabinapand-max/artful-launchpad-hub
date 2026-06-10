import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { fetchLeads, type LeadRow } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PW_KEY = "admin_pw";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Leads" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function toCsv(rows: LeadRow[]) {
  const header = ["id", "created_at", "lang", "contact", "services", "user_agent"];
  const esc = (v: string | null) => {
    const s = (v ?? "").replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push([r.id, r.created_at, r.lang, r.contact, r.services, r.user_agent].map(esc).join(","));
  }
  return lines.join("\n");
}

function AdminPage() {
  const fetchFn = useServerFn(fetchLeads);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [search, setSearch] = useState("");
  const [lang, setLang] = useState<"all" | "ro" | "en">("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? sessionStorage.getItem(PW_KEY) : null;
    if (saved) {
      setPassword(saved);
      void load(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load(pw = password) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchFn({ data: { password: pw, search, lang } });
      if (!res.ok) {
        setError(res.error);
        setAuthed(false);
        sessionStorage.removeItem(PW_KEY);
      } else {
        setRows(res.rows);
        setAuthed(true);
        sessionStorage.setItem(PW_KEY, pw);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => rows, [rows]);

  function exportCsv() {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            load();
          }}
          className="w-full max-w-sm space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm"
        >
          <div>
            <h1 className="text-xl font-semibold">Admin access</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter the admin password to view leads.
            </p>
          </div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading || !password} className="w-full">
            {loading ? "Checking..." : "Continue"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Leads</h1>
            <p className="text-sm text-muted-foreground">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contact or services..."
              className="w-64"
            />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as typeof lang)}
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="all">All languages</option>
              <option value="ro">Romanian</option>
              <option value="en">English</option>
            </select>
            <Button onClick={() => load()} disabled={loading} variant="outline">
              {loading ? "Loading..." : "Apply"}
            </Button>
            <Button onClick={exportCsv} disabled={!filtered.length}>
              Export CSV
            </Button>
          </div>
        </div>

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Created</TableHead>
                <TableHead>Lang</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Services</TableHead>
                <TableHead className="w-16" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id} className="cursor-pointer">
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-xs uppercase">{r.lang ?? "—"}</TableCell>
                  <TableCell className="text-sm">{r.contact}</TableCell>
                  <TableCell className="max-w-md truncate text-sm">{r.services}</TableCell>
                  <TableCell className="text-right">
                    <Link
                      to="/admin/$leadId"
                      params={{ leadId: r.id }}
                      className="text-xs font-medium text-primary underline-offset-4 hover:underline"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {!filtered.length && (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">
                    No leads yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
