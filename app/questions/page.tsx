import Link from "next/link";
import { HelpCircle, PlusCircle, MessageSquare, GraduationCap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function QuestionsPage() {
  let questions: any[] = [];
  try {
    questions = await prisma.question.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            surname: true,
            university: true,
          },
        },
        _count: {
          select: { answers: true },
        },
        answers: {
          where: { isAccepted: true },
          select: { id: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Fetch questions error:", error);
  }

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
      {questions.length === 0 ? (
        <Card className="p-12 text-center space-y-4">
          <HelpCircle className="h-12 w-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Henüz soru sorulmamış</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Takıldığınız bir teknik konuyu topluluğa ilk soran siz olun!
          </p>
          <Link href="/questions/new" className="inline-block pt-2">
            <Button className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700">
              <PlusCircle className="h-4 w-4" /> Soru Sor
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => {
            const isSolved = q.answers?.length > 0;
            return (
              <Card key={q.id} className="hover:border-emerald-500/40 transition-all">
                <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {q.author ? `${q.author.name} ${q.author.surname || ""}`.trim() : "Anonim"}
                      </span>
                      {q.author?.university && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1"><GraduationCap className="h-3 w-3" /> {q.author.university}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{formatDate(q.createdAt)}</span>
                    </div>

                    <Link href={`/questions/${q.id}`}>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer">
                        {q.title}
                      </h3>
                    </Link>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {q.tags?.map((t: string) => (
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
                      <span>{q._count?.answers || 0} Cevap</span>
                    </div>

                    {isSolved && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-500 mt-2">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Çözüldü
                      </span>
                    )}
                  </div>

                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

    </div>
  );
}
