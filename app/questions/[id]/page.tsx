import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, HelpCircle, GraduationCap, MessageSquare, CheckCircle2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import AnswerForm from "./AnswerForm";

export const revalidate = 0;

export default async function QuestionDetailPage({ params }: { params: { id: string } }) {
  let question: any = null;

  try {
    question = await prisma.question.findUnique({
      where: { id: params.id },
      include: {
        author: true,
        answers: {
          include: {
            author: true,
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (question) {
      await prisma.question.update({
        where: { id: params.id },
        data: { views: { increment: 1 } },
      });
    }
  } catch (error) {
    console.error("Fetch question detail error:", error);
  }

  if (!question) {
    notFound();
  }

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
            {question.tags?.map((t: string) => (
              <Badge key={t} variant="indigo">
                {t}
              </Badge>
            ))}
          </div>

          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            {question.title}
          </CardTitle>

          <div className="flex items-center gap-3 text-xs text-slate-500 pt-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="h-8 w-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center">
              {question.author?.name?.[0] || <User className="h-4 w-4" />}
            </div>
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {question.author ? `${question.author.name} ${question.author.surname || ""}`.trim() : "Anonim"}
              </span>
              {question.author?.university && (
                <>
                  <span className="mx-1.5">•</span>
                  <span><GraduationCap className="h-3 w-3 inline mr-1 text-emerald-500" />{question.author.university}</span>
                </>
              )}
              <span className="mx-1.5">•</span>
              <span>{formatDate(question.createdAt)}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line">
          {question.content}
        </CardContent>
      </Card>

      {/* Real Answers Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
          <MessageSquare className="h-5 w-5 text-emerald-500" />
          <span>Yanıtlar ({question.answers?.length || 0})</span>
        </div>

        {question.answers?.length === 0 ? (
          <Card className="p-8 text-center space-y-2">
            <p className="text-sm text-slate-500">Henüz yanıt verilmemiş. İlk yanıtı siz yazın!</p>
          </Card>
        ) : (
          question.answers?.map((answer: any) => (
            <Card
              key={answer.id}
              className={`p-5 space-y-3 ${
                answer.isAccepted
                  ? "border-emerald-500/60 bg-emerald-50/20 dark:bg-emerald-950/10"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <div className="h-6 w-6 rounded-full bg-slate-700 text-white text-xs font-bold flex items-center justify-center">
                    {answer.author?.name?.[0] || "Y"}
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {answer.author ? `${answer.author.name} ${answer.author.surname || ""}`.trim() : "Anonim"}
                  </span>
                  {answer.author?.university && (
                    <>
                      <span>•</span>
                      <span>{answer.author.university}</span>
                    </>
                  )}
                  <span>•</span>
                  <span>{formatDate(answer.createdAt)}</span>
                </div>

                {answer.isAccepted && (
                  <Badge variant="emerald" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Kabul Edilen Yanıt
                  </Badge>
                )}
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {answer.content}
              </p>
            </Card>
          ))
        )}
      </div>

      {/* Answer Submission Form */}
      <AnswerForm questionId={question.id} />
    </div>
  );
}
