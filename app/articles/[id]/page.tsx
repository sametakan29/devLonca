import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, GraduationCap, Calendar, Eye, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function ArticleDetailPage({ params }: { params: { id: string } }) {
  let article: any = null;

  try {
    article = await prisma.article.findUnique({
      where: { id: params.id },
      include: {
        author: true,
      },
    });

    if (article) {
      // Increment view count
      await prisma.article.update({
        where: { id: params.id },
        data: { views: { increment: 1 } },
      });
    }
  } catch (error) {
    console.error("Fetch article detail error:", error);
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 space-y-8">
      {/* Back Button */}
      <Link href="/articles">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Makalelere Dön
        </Button>
      </Link>

      {/* Article Header */}
      <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex flex-wrap gap-2">
          {article.tags?.map((t: string) => (
            <Badge key={t} variant="indigo">
              {t}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        {/* Author Details Bar */}
        <div className="flex flex-wrap items-center justify-between text-sm text-slate-500 pt-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center">
              {article.author?.name?.[0] || "A"}
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">
                {article.author ? `${article.author.name} ${article.author.surname || ""}`.trim() : "Anonim"}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <GraduationCap className="h-3.5 w-3.5 text-indigo-500" />
                {article.author?.university || "Öğrenci / Geliştirici"} 
                {article.author?.department ? ` • ${article.author.department}` : ""}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {formatDate(article.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> {article.views} okuma
            </span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed font-sans text-base">
        {article.content.split('\n\n').map((paragraph: string, index: number) => (
          <p key={index} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Article Footer & Author Box */}
      <Card className="p-6 bg-slate-50 dark:bg-slate-900/60 space-y-3 mt-10">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Yazar Hakkında</h3>
        <p className="text-xs text-slate-500">
          {article.author?.bio || `${article.author?.name || "Yazar"}, devLonca açık kaynak topluluğu üyesidir.`}
        </p>
        {article.author?.githubUrl && (
          <div className="pt-2 flex items-center gap-3">
            <a href={article.author.githubUrl} target="_blank" rel="noreferrer">
              <Button size="sm" variant="outline" className="gap-2 text-xs">
                <Github className="h-3.5 w-3.5" /> GitHub Profili
              </Button>
            </a>
          </div>
        )}
      </Card>
    </div>
  );
}
