import Link from "next/link";
import { BookOpen, PlusCircle, Search, GraduationCap, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const revalidate = 0; // Dynamic server fetching

export default async function ArticlesPage() {
  let articles: any[] = [];
  try {
    articles = await prisma.article.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            surname: true,
            university: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Fetch articles error:", error);
  }

  const popularTags = ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Tailwind", "Open Source"];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
            <BookOpen className="h-4 w-4" /> Teknik Blog & Makaleler
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Topluluk Makaleleri
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Yazılımcılar tarafından kaleme alınan teknik deneyimler, rehberler ve mimari yazılar.
          </p>
        </div>

        <Link href="/articles/new">
          <Button className="gap-2 shadow-lg shadow-indigo-500/20">
            <PlusCircle className="h-4 w-4" /> Yeni Makale Yaz
          </Button>
        </Link>
      </div>

      {/* Filter & Tag Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Makalelerde ara..." className="pl-9" />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 mr-1">Etiketler:</span>
          {popularTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-950 transition-colors">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <Card className="p-12 text-center space-y-4">
          <BookOpen className="h-12 w-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Henüz yayınlanmış makale yok</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Topluluğun ilk teknik makalesini kaleme alan siz olun!
          </p>
          <Link href="/articles/new" className="inline-block pt-2">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" /> İlk Makaleyi Yaz
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="flex flex-col justify-between hover:border-indigo-500/50 transition-all hover:shadow-md">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                    <GraduationCap className="h-3.5 w-3.5 text-indigo-500" />
                    <span>
                      {article.author ? `${article.author.name} ${article.author.surname || ""}`.trim() : "Anonim"}
                      {article.author?.university ? ` (${article.author.university})` : ""}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {formatDate(article.createdAt)}
                  </span>
                </div>

                <Link href={`/articles/${article.id}`}>
                  <CardTitle className="text-xl font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer leading-snug">
                    {article.title}
                  </CardTitle>
                </Link>

                <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                  {article.summary || article.content.substring(0, 160)}
                </CardDescription>
              </CardHeader>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {article.tags?.map((t: string) => (
                    <Badge key={t} variant="indigo" className="text-[11px]">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{article.views || 0}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
}
