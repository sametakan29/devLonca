import Link from "next/link";
import { ArrowLeft, GraduationCap, Calendar, Eye, Github, Share2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  const article = {
    id: params.id || "1",
    title: "Next.js 14 App Router ve Server Actions ile Modern Web Geliştirme",
    content: `
Next.js 14, React geliştirme ekosistemine getirdiği yeniliklerle web uygulamalarını inşa etme biçimimizi kökten değiştirdi. Özellikle **App Router** mimarisi ve **Server Actions**, istemci ile sunucu arasındaki veri akışını ve render mantığını olağanüstü kolaylaştırdı.

### 1. App Router Neden Fark Yaratıyor?

Eski \`pages\` dizinine kıyasla \`app\` dizini:
- **React Server Components (RSC):** Bileşenlerin varsayılan olarak sunucuda render edilmesini sağlar. İstemci tarafında sıfır JavaScript yükü!
- **İç İçe Düzenler (Nested Layouts):** Sayfa geçişlerinde tekrarlayan UI bileşenlerinin yeniden yüklenmesini engeller.
- **Paralel ve Önlemli Rotalar:** Karmaşık dashboard ve modal yapılarını kolaylaştırır.

### 2. Server Actions Kullanımı

Form işlemlerinde API endpoint'leri yazmak yerine doğrudan sunucu fonksiyonlarını çağırabilirsiniz:

\`\`\`typescript
export async function createPost(formData: FormData) {
  'use server';
  const title = formData.get('title');
  await prisma.post.create({ data: { title } });
}
\`\`\`

### 3. Sonuç ve Öneriler

Açık kaynak projelerinizde Next.js 14 App Router tercih ederek Vercel üzerinde yüksek performanslı, SEO uyumlu ve hızlı uygulamalar geliştirebilirsiniz.
    `,
    author: {
      name: "Ahmet Yılmaz",
      university: "İstanbul Teknik Üniversitesi",
      department: "Bilgisayar Mühendisliği",
      githubUrl: "https://github.com",
    },
    date: "8 Ağustos 2026",
    views: 240,
    tags: ["Next.js", "React", "TypeScript", "App Router"],
  };

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
          {article.tags.map((t) => (
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
              {article.author.name[0]}
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">
                {article.author.name}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <GraduationCap className="h-3.5 w-3.5 text-indigo-500" />
                {article.author.university} • {article.author.department}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> {article.views} okuma
            </span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed">
        {article.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Article Footer & Author Box */}
      <Card className="p-6 bg-slate-50 dark:bg-slate-900/60 space-y-3 mt-10">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Yazar Hakkında</h3>
        <p className="text-xs text-slate-500">
          {article.author.name}, {article.author.university} {article.author.department} öğrencisi ve açık kaynak geliştiricidir.
        </p>
        <div className="pt-2 flex items-center gap-3">
          <a href={article.author.githubUrl} target="_blank" rel="noreferrer">
            <Button size="sm" variant="outline" className="gap-2 text-xs">
              <Github className="h-3.5 w-3.5" /> GitHub Profili
            </Button>
          </a>
        </div>
      </Card>
    </div>
  );
}
