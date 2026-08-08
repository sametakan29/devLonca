"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { HelpCircle, Send, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AskQuestionPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!session) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold">Soru Sormak İçin Giriş Yapın</h2>
        <p className="text-slate-500">Topluluktan destek alabilmek için oturum açmalısınız.</p>
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
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/questions");
        router.refresh();
      } else {
        setError(data.error || "Soru oluşturulurken bir hata oluştu.");
      }
    } catch (err) {
      setError("Bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 space-y-6">
      <Link href="/questions">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Sorulara Dön
        </Button>
      </Link>

      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
            <HelpCircle className="h-4 w-4" /> Yeni Soru Sor
          </div>
          <CardTitle className="text-2xl font-bold">Topluluktan Destek Alın</CardTitle>
          <CardDescription>
            Karşılaştığınız bug'ı, mimari tereddüdünüzü veya teknik sorunuzu detaylandırın.
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
                Soru Başlığı *
              </label>
              <Input
                placeholder="Örn: NextAuth Credentials provider ile JWT custom claim ekleme sorunu"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Etiketler (Virgülle Ayırın)
              </label>
              <Input
                placeholder="NextAuth, Next.js, JWT, React"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Soru Detayı ve Kod Bloğu *
              </label>
              <textarea
                rows={10}
                placeholder="Sorunuzu, aldığınız hata mesajını ve denediğiniz çözümleri detaylı açıklayın..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-800 dark:bg-slate-950 font-mono"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Link href="/questions">
                <Button type="button" variant="outline">
                  İptal
                </Button>
              </Link>
              <Button type="submit" disabled={loading} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white border-none">
                <Send className="h-4 w-4" />
                {loading ? "Gönderiliyor..." : "Soruyu Yayınla"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
