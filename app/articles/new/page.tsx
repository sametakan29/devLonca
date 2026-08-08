"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { BookOpen, Send, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function NewArticlePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!session) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold">Makale Yazmak İçin Giriş Yapın</h2>
        <p className="text-slate-500">Topluluğumuzda makale yayınlayabilmek için üye girişi yapmalısınız.</p>
        <Link href="/login">
          <Button>Giriş Yap</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          summary,
          content,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/articles");
        router.refresh();
      } else {
        setError(data.error || "Makale oluşturulurken bir hata oluştu.");
      }
    } catch (err) {
      setError("Bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 space-y-6">
      <Link href="/articles">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Makalelere Dön
        </Button>
      </Link>

      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
            <BookOpen className="h-4 w-4" /> Yeni Makale Oluştur
          </div>
          <CardTitle className="text-2xl font-bold">Teknik İçeriğinizi Paylaşın</CardTitle>
          <CardDescription>
            Deneyimlerinizi, mimari kararlarınızı veya eğitici kılavuzlarınızı yazılım topluluğuna sunun.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-950/50 p-3 text-xs text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Makale Başlığı *
              </label>
              <Input
                placeholder="Örn: Next.js App Router & Prisma ile Clean Architecture"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Kısa Özet (Summary)
              </label>
              <Input
                placeholder="Makalenin ana konusunu özetleyen kısa bir cümle..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Etiketler (Virgülle Ayırın)
              </label>
              <Input
                placeholder="Next.js, TypeScript, PostgreSQL, Prisma"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Makale İçeriği (Markdown veya Düz Metin) *
              </label>
              <textarea
                rows={12}
                placeholder="Makalenizi buraya detaylı bir şekilde yazın..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 font-mono"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Link href="/articles">
                <Button type="button" variant="outline">
                  İptal
                </Button>
              </Link>
              <Button type="submit" disabled={loading} className="gap-2">
                <Send className="h-4 w-4" />
                {loading ? "Yayınlanıyor..." : "Yayınla"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
