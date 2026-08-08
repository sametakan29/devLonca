"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { 
  User, 
  Github, 
  GraduationCap, 
  Briefcase, 
  Tag, 
  Edit3, 
  BookOpen, 
  HelpCircle, 
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const user = session?.user as any;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    surname: user?.surname || "",
    bio: user?.bio || "Açık kaynak tutkunu yazılım geliştirici.",
    githubUrl: user?.githubUrl || "",
    university: user?.university || "",
    department: user?.department || "",
    internshipType: user?.internshipType || "Zorunlu Staj",
    skills: Array.isArray(user?.skills) ? user.skills.join(", ") : "React, TypeScript, Next.js, Tailwind CSS",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Profil başarıyla güncellendi!");
        await update();
        setIsEditing(false);
      } else {
        setMessage(data.error || "Güncelleme başarısız.");
      }
    } catch (err) {
      setMessage("Sunucu hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold">Profilinizi Görüntülemek İçin Giriş Yapın</h2>
        <p className="text-slate-500">Profil bilgilerinizi yönetmek için oturum açmalısınız.</p>
        <Link href="/login">
          <Button>Giriş Yap</Button>
        </Link>
      </div>
    );
  }

  const skillsList = typeof formData.skills === "string" 
    ? formData.skills.split(",").map(s => s.trim()).filter(Boolean)
    : (user?.skills || []);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10 space-y-8">
      
      {/* Profile Header Banner */}
      <Card className="relative overflow-hidden border-slate-200 dark:border-slate-800">
        <div className="h-32 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-900" />
        <CardContent className="pt-0 relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-12 mb-4 gap-4">
            <div className="flex items-end gap-4">
              <div className="h-24 w-24 rounded-2xl bg-slate-900 border-4 border-white dark:border-slate-900 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {user?.name?.[0]?.toUpperCase() || <User className="h-10 w-10" />}
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {user?.name} {user?.surname}
                </h1>
                <p className="text-xs text-slate-500 font-mono">{user?.email}</p>
              </div>
            </div>

            <Button
              variant={isEditing ? "outline" : "default"}
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="gap-2"
            >
              <Edit3 className="h-4 w-4" />
              {isEditing ? "Vazgeç" : "Profili Düzenle"}
            </Button>
          </div>

          {message && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 p-3 text-xs text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <CheckCircle className="h-4 w-4" />
              <span>{message}</span>
            </div>
          )}

          {/* Edit Form */}
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-sm">Profil Bilgilerini Güncelle</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Ad</label>
                  <Input name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Soyad</label>
                  <Input name="surname" value={formData.surname} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Hakkımda / Bio</label>
                <textarea
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm dark:border-slate-800 dark:bg-slate-950"
                  placeholder="Kendinizden ve ilgi alanlarınızdan bahsedin..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Üniversite</label>
                  <Input name="university" value={formData.university} onChange={handleChange} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Bölüm</label>
                  <Input name="department" value={formData.department} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Staj Arayış Türü</label>
                  <select
                    name="internshipType"
                    value={formData.internshipType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-950"
                  >
                    <option value="Zorunlu Staj">Zorunlu Staj</option>
                    <option value="Gönüllü Staj">Gönüllü Staj</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Tam Zamanlı">Tam Zamanlı</option>
                    <option value="Aradığım Yok">Aradığım Yok</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">GitHub Adresi</label>
                  <Input name="githubUrl" value={formData.githubUrl} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Yetenekler & Teknolojiler (Virgülle ayırın)</label>
                <Input name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Next.js, Node.js, Prisma" />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </Button>
            </form>
          ) : (
            /* Read-Only Profile View */
            <div className="space-y-6 pt-2">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {user?.bio || "Henüz biyografi eklenmemiş."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <GraduationCap className="h-5 w-5 text-indigo-500" />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Eğitim</div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">
                      {user?.university || "Belirtilmedi"} - {user?.department || "Bölüm yok"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <Briefcase className="h-5 w-5 text-emerald-500" />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Staj / Pozisyon</div>
                    <Badge variant="emerald" className="mt-0.5">
                      {user?.internshipType || "Staj arayışı yok"}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <Github className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">GitHub</div>
                    {user?.githubUrl ? (
                      <a href={user.githubUrl} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                        Profil Linki
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">Eklenmedi</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <Tag className="h-4 w-4 text-indigo-500" /> Yetenekler & Teknolojiler
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill: string) => (
                    <Badge key={skill} variant="indigo" className="text-xs py-1 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Activity Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* User's Articles */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-500" />
              <CardTitle className="text-lg">Makalelerim</CardTitle>
            </div>
            <Link href="/articles/new">
              <Button size="sm" variant="outline">Yeni Yazı</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-lg border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-2">
              <p className="text-xs text-slate-500">Henüz yayınlanmış bir makaleniz bulunmuyor.</p>
              <Link href="/articles/new">
                <Button size="sm" variant="ghost" className="text-indigo-600 dark:text-indigo-400">
                  + İlk teknik yazınızı paylaşın
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* User's Questions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-emerald-500" />
              <CardTitle className="text-lg">Sorularım</CardTitle>
            </div>
            <Link href="/questions/new">
              <Button size="sm" variant="outline">Soru Sor</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-lg border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-2">
              <p className="text-xs text-slate-500">Sorduğunuz sorular burada listelenecektir.</p>
              <Link href="/questions/new">
                <Button size="sm" variant="ghost" className="text-emerald-600 dark:text-emerald-400">
                  + Topluluğa soru sorun
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
