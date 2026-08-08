"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, GraduationCap, MessageSquare, CheckCircle2, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function QuestionDetailPage({ params }: { params: { id: string } }) {
  const [answers, setAnswers] = useState([
    {
      id: "a1",
      author: "Zeynep K.",
      university: "ODTÜ Yazılım Müh.",
      content: "TypeScript Generic Constraint kullanmak için `<T extends Record<string, any>>` şeklinde sınırlandırma yapabilirsiniz. Bu sayede React props tiplerini güvenli şekilde daraltabilirsiniz.",
      date: "1 saat önce",
      isAccepted: true,
    },
    {
      id: "a2",
      author: "Deniz A.",
      university: "Ege Üni.",
      content: "Ayrıca `React.ComponentPropsWithRef<'button'>` gibi hazır helper tiplerden faydalanmak kod tekrarını oldukça azaltıyor.",
      date: "30 dakika önce",
      isAccepted: false,
    },
  ]);

  const [newAnswer, setNewAnswer] = useState("");

  const question = {
    id: params.id || "1",
    title: "TypeScript'te Generic Constraint kullanımı ve React Props tiplendirme",
    content: "Merhaba topluluk, React bileşenlerimde dinamik prop geçirirken TypeScript generic yapısını kısıtlamakta sorun yaşıyorum. Özel bir `ButtonProps` veya `CardProps` bileşeni yazarken `<T extends ...>` kısmını en temiz şekilde nasıl yazabiliriz?",
    author: "Burak K.",
    university: "Hacettepe Bilgisayar",
    date: "2 saat önce",
    tags: ["TypeScript", "React", "Frontend"],
  };

  const handleAddAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    setAnswers([
      ...answers,
      {
        id: `a-${Date.now()}`,
        author: "Siz (Geliştirici)",
        university: "Topluluk Üyesi",
        content: newAnswer,
        date: "Şimdi",
        isAccepted: false,
      },
    ]);
    setNewAnswer("");
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 space-y-8">
      
      {/* Back Button */}
      <Link href="/questions">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Sorulara Dön
        </Button>
      </Link>

      {/* Main Question Card */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {question.tags.map((t) => (
              <Badge key={t} variant="indigo">
                {t}
              </Badge>
            ))}
          </div>

          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            {question.title}
          </CardTitle>

          <div className="flex items-center gap-3 text-xs text-slate-500 pt-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="h-7 w-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center">
              {question.author[0]}
            </div>
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">{question.author}</span>
              <span className="mx-1.5">•</span>
              <span><GraduationCap className="h-3 w-3 inline mr-1" />{question.university}</span>
              <span className="mx-1.5">•</span>
              <span>{question.date}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
          {question.content}
        </CardContent>
      </Card>

      {/* Answers Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
          <MessageSquare className="h-5 w-5 text-emerald-500" />
          <span>Yanıtlar ({answers.length})</span>
        </div>

        {answers.map((answer) => (
          <Card key={answer.id} className={`p-5 space-y-3 ${answer.isAccepted ? "border-emerald-500/60 bg-emerald-50/20 dark:bg-emerald-950/10" : ""}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="h-6 w-6 rounded-full bg-slate-700 text-white text-xs font-bold flex items-center justify-center">
                  {answer.author[0]}
                </div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{answer.author}</span>
                <span>•</span>
                <span>{answer.university}</span>
                <span>•</span>
                <span>{answer.date}</span>
              </div>

              {answer.isAccepted && (
                <Badge variant="emerald" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Kabul Edilen Yanıt
                </Badge>
              )}
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {answer.content}
            </p>
          </Card>
        ))}
      </div>

      {/* Answer Form */}
      <Card className="p-6">
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">Yanıtınızı Yazın</h3>
        <form onSubmit={handleAddAnswer} className="space-y-3">
          <textarea
            rows={4}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Soru sahibine yardımcı olacak açıklayıcı bir yanıt yazın..."
            className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-800 dark:bg-slate-950"
            required
          />
          <div className="flex justify-end">
            <Button type="submit" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white border-none">
              <Send className="h-4 w-4" /> Yanıtı Gönder
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
