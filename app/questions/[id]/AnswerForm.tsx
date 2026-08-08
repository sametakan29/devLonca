"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AnswerForm({ questionId }: { questionId: string }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!session) {
    return (
      <Card className="p-6 text-center space-y-2 bg-slate-50 dark:bg-slate-900/50">
        <p className="text-xs text-slate-500">Yanıt yazabilmek ve yardımcı olmak için oturum açmalısınız.</p>
        <Link href="/login">
          <Button size="sm">Giriş Yap</Button>
        </Link>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/questions/${questionId}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (res.ok) {
        setContent("");
        router.refresh();
      } else {
        setError(data.error || "Yanıt gönderilirken hata oluştu.");
      }
    } catch (err) {
      setError("Bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">Yanıtınızı Yazın</h3>
      
      {error && (
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-950/50 p-2.5 text-xs text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Soru sahibine yardımcı olacak açıklayıcı bir yanıt yazın..."
          className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-800 dark:bg-slate-950 font-sans"
          required
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white border-none">
            <Send className="h-4 w-4" />
            {loading ? "Gönderiliyor..." : "Yanıtı Gönder"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
