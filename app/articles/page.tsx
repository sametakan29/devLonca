import Link from "next/link";
import { BookOpen, PlusCircle, Search, GraduationCap, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function ArticlesPage() {
  const dummyArticles = [
    {
      id: "1",
      title: "Next.js 14 App Router ve Server Actions ile Modern Web Geliştirme",
      summary: "Next.js 14 App Router mimarisi, React Server Components ve Server Actions kullanarak tam donanımlı web uygulamaları inşa etme rehberi.",
      author: "Ahmet Yılmaz",
      university: "İTÜ Bilgisayar Müh.",
      date: "8 Ağustos 2026",
      tags: ["Next.js", "React", "TypeScript"],
      views: 240,
    },
    {
      id: "2",
      title: "Prisma ORM & PostgreSQL ile Veritabanı Mimarisi ve Clean Code",
      summary: "Ölçeklenebilir veritabanı şemaları oluşturma, migration yönetimi ve Prisma Client optimizasyon ipuçları.",
      author: "Zeynep Kaya",
      university: "ODTÜ Yazılım Müh.",
      date: "7 Ağustos 2026",
      tags: ["PostgreSQL", "Prisma", "Database"],
      views: 185,
    },
    {
      id: "3",
      title: "Açık Kaynak Projelere İlk PR: GitHub İş Akışı ve Etiket Kültürü",
      summary: "İlk açık kaynak katkınızı yaparken dikkat etmeniz gerekenler, commit standartları ve PR inceleme süreçleri.",
      author: "Can Demir",
      university: "Marmara Üni. YBS",
      date: "5 Ağustos 2026",
      tags: ["Open Source", "Git", "GitHub"],
      views: 310,
    },
    {
      id: "4",
      title: "Tailwind CSS ve shadcn/ui ile Erişilebilir ve Şık Arayüz Tasarımı",
      summary: "Modern web uygulamalarında karanlık mod, responsive layout ve eklentilerle UI geliştirme pratikleri.",
      author: "Deniz Arslan",
      university: "Ege Üni. Bilgisayar Müh.",
      date: "3 Ağustos 2026",
      tags: ["Tailwind", "CSS", "UI/UX"],
      views: 142,
    },
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyArticles.map((article) => (
          <Card key={article.id} className="flex flex-col justify-between hover:border-indigo-500/50 transition-all hover:shadow-md">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                  <GraduationCap className="h-3.5 w-3.5 text-indigo-500" />
                  <span>{article.author} ({article.university})</span>
                </div>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {article.date}
                </span>
              </div>

              <Link href={`/articles/${article.id}`}>
                <CardTitle className="text-xl font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer leading-snug">
                  {article.title}
                </CardTitle>
              </Link>

              <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                {article.summary}
              </CardDescription>
            </CardHeader>

            <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 mt-auto">
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((t) => (
                  <Badge key={t} variant="indigo" className="text-[11px]">
                    {t}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                <Eye className="h-3.5 w-3.5" />
                <span>{article.views}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
