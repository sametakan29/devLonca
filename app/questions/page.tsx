import Link from "next/link";
import { HelpCircle, PlusCircle, MessageSquare, GraduationCap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function QuestionsPage() {
  const dummyQuestions = [
    {
      id: "1",
      title: "TypeScript'te Generic Constraint kullanımı ve React Props tiplendirme",
      author: "Burak K.",
      university: "Hacettepe Bilgisayar",
      answersCount: 4,
      isSolved: true,
      tags: ["TypeScript", "React", "Frontend"],
      date: "2 saat önce",
    },
    {
      id: "2",
      title: "Zorunlu staj için Back-End alanında öne çıkan açık kaynak projeler nelerdir?",
      author: "Elif S.",
      university: "Yıldız Teknik Üni.",
      answersCount: 7,
      isSolved: false,
      tags: ["Staj", "Career", "Backend"],
      date: "5 saat önce",
    },
    {
      id: "3",
      title: "NextAuth Credentials provider ile JWT custom claim ekleme sorunu",
      author: "Mert T.",
      university: "Gazi Üni.",
      answersCount: 2,
      isSolved: false,
      tags: ["NextAuth", "Next.js", "Auth"],
      date: "1 gün önce",
    },
    {
      id: "4",
      title: "Prisma Client connection pooling ve Vercel Serverless Function sınırı",
      author: "Selin A.",
      university: "Dokuz Eylül Üni.",
      answersCount: 5,
      isSolved: true,
      tags: ["Prisma", "PostgreSQL", "Vercel"],
      date: "2 gün önce",
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
            <HelpCircle className="h-4 w-4" /> Topluluk Forumu
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Sorular & Yardım
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Yazılım geliştirirken takıldığınız konuları sorun, cevaplayın ve tecrübelerinizi paylaşın.
          </p>
        </div>

        <Link href="/questions/new">
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 border-none">
            <PlusCircle className="h-4 w-4" /> Soru Sor
          </Button>
        </Link>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {dummyQuestions.map((q) => (
          <Card key={q.id} className="hover:border-emerald-500/40 transition-all">
            <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{q.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><GraduationCap className="h-3 w-3" /> {q.university}</span>
                  <span>•</span>
                  <span>{q.date}</span>
                </div>

                <Link href={`/questions/${q.id}`}>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer">
                    {q.title}
                  </h3>
                </Link>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {q.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Answers & Status Badge */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{q.answersCount} Cevap</span>
                </div>

                {q.isSolved && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-500 mt-2">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Çözüldü
                  </span>
                )}
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
