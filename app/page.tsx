import Link from "next/link";
import { 
  Code2, 
  BookOpen, 
  HelpCircle, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Github, 
  GraduationCap, 
  Briefcase, 
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function HomePage() {
  let latestArticles: any[] = [];
  let latestQuestions: any[] = [];

  try {
    latestArticles = await prisma.article.findMany({
      where: { published: true },
      include: {
        author: {
          select: { name: true, surname: true, university: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    latestQuestions = await prisma.question.findMany({
      include: {
        author: {
          select: { name: true, surname: true },
        },
        _count: {
          select: { answers: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch (error) {
    console.error("Home page DB fetch error:", error);
  }

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Glowing Gradient Backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[250px] bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/60 dark:text-indigo-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
            <span>devLonca v0.1 Açık Kaynak Web Platformu</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Geleceğin Yazılımcıları İçin{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-400 bg-clip-text text-transparent">
              Özgür & Açık Kaynak
            </span>{" "}
            Topluluk
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal">
            Teknik makaleler paylaşın, sorularınıza yanıt bulun, açık kaynak projelere katkı verin ve staj arayışınızda yalnız kalmayın.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 py-6 rounded-xl shadow-lg shadow-indigo-500/25">
                Topluluğa Katıl
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/articles">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base px-8 py-6 rounded-xl">
                <BookOpen className="h-5 w-5" />
                Makaleleri İncele
              </Button>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-12">
            {[
              { label: "Açık Kaynak Geliştirici", value: "500+", icon: Users },
              { label: "Paylaşılan Makale", value: "120+", icon: BookOpen },
              { label: "Çözülen Soru", value: "350+", icon: HelpCircle },
              { label: "Katkı Sağlanan Repo", value: "25+", icon: Github },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/40 backdrop-blur-sm flex flex-col items-center"
                >
                  <Icon className="h-5 w-5 text-indigo-500 mb-1" />
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Feature Cards */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Neden devLonca Platformu?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm">
            Yazılım öğrenim sürecinde karşılaşacağınız tüm ihtiyaçlar için modüler yapı.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:border-indigo-500/50 transition-all hover:shadow-md">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
                <BookOpen className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Teknik Makaleler</CardTitle>
              <CardDescription>
                Topluluk üyeleri tarafından yazılan derinlemesine bloglar, rehberler ve rehber serileri.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:border-indigo-500/50 transition-all hover:shadow-md">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
                <HelpCircle className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Topluluk Q&A</CardTitle>
              <CardDescription>
                Kod yazarken takıldığınız konuları sorun, tecrübeli geliştiricilerden çözümler alın.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:border-indigo-500/50 transition-all hover:shadow-md">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-violet-100 dark:bg-violet-950/80 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-2">
                <Briefcase className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Staj & Yetenek Etiketleri</CardTitle>
              <CardDescription>
                Üniversiteniz, bölümünüz ve aradığınız zorunlu/gönüllü staj türü ile görünür olun.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Recent Articles & Questions Preview */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Articles Column (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-500" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Son Makaleler</h3>
              </div>
              <Link href="/articles" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                Tümünü Gör <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {latestArticles.length === 0 ? (
                <p className="text-xs text-slate-500 italic p-4 border border-dashed rounded-lg text-center">
                  Henüz makale yazılmadı. İlk makaleyi siz yazın!
                </p>
              ) : (
                latestArticles.map((article) => (
                  <Card key={article.id} className="hover:border-indigo-500/40 transition-all">
                    <CardHeader className="p-5">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {article.author ? `${article.author.name} ${article.author.surname || ""}`.trim() : "Anonim"}
                          </span>
                          {article.author?.university && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1"><GraduationCap className="h-3 w-3" /> {article.author.university}</span>
                            </>
                          )}
                        </div>
                        <span>{formatDate(article.createdAt)}</span>
                      </div>

                      <Link href={`/articles/${article.id}`}>
                        <CardTitle className="text-lg hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer leading-snug">
                          {article.title}
                        </CardTitle>
                      </Link>

                      <CardDescription className="line-clamp-2 mt-2">
                        {article.summary || article.content.substring(0, 160)}
                      </CardDescription>

                      <div className="flex items-center justify-between pt-4">
                        <div className="flex flex-wrap gap-1.5">
                          {article.tags?.map((tag: string) => (
                            <Badge key={tag} variant="indigo">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-xs text-slate-400 font-mono">{article.views || 0} okuma</span>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Q&A Sidebar (1 col) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-emerald-500" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Son Sorular</h3>
              </div>
              <Link href="/questions" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                Tümünü Gör <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {latestQuestions.length === 0 ? (
                <p className="text-xs text-slate-500 italic p-4 border border-dashed rounded-lg text-center">
                  Henüz soru sorulmadı.
                </p>
              ) : (
                latestQuestions.map((q) => (
                  <Card key={q.id} className="hover:border-emerald-500/40 transition-all">
                    <CardContent className="p-4 space-y-3">
                      <Link href={`/questions/${q.id}`}>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2">
                          {q.title}
                        </h4>
                      </Link>

                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{q.author?.name || "Anonim"} • {formatDate(q.createdAt)}</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                          {q._count?.answers || 0} Yanıt
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {q.tags?.map((t: string) => (
                          <Badge key={t} variant="secondary" className="text-[10px] py-0">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Quick Ask CTA Box */}
            <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-none p-6 text-center space-y-3">
              <Layers className="h-8 w-8 text-indigo-400 mx-auto" />
              <h4 className="font-bold text-lg">Sorun mu Var?</h4>
              <p className="text-xs text-slate-300">
                Topluluğa hemen soru sor, dakikalar içinde çözüm üret.
              </p>
              <Link href="/questions/new" className="block pt-2">
                <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white border-none">
                  Soru Sor
                </Button>
              </Link>
            </Card>
          </div>

        </div>
      </section>
    </div>
  );
}
