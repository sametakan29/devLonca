"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Code2, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    university: "",
    department: "",
    internshipType: "Zorunlu Staj",
    githubUrl: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Kayıt sırasında bir hata oluştu.");
        setLoading(false);
        return;
      }

      setSuccess("Hesabınız başarıyla oluşturuldu! Giriş sayfasına yönlendiriliyorsunuz...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setError("Bağlantı hatası oluştu.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg shadow-xl border-slate-200 dark:border-slate-800">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
            <Code2 className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold">Topluluğa Katılın</CardTitle>
          <CardDescription>
            devLonca geliştirici ağına katılarak açık kaynak ekosisteminde yerinizi alın.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-950/50 p-3 text-xs text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 p-3 text-xs text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Name & Surname */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Ad *
                </label>
                <Input
                  name="name"
                  placeholder="Ahmet"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Soyad
                </label>
                <Input
                  name="surname"
                  placeholder="Yılmaz"
                  value={formData.surname}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email & Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  E-posta *
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="ahmet@ogrenci.edu.tr"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Şifre *
                </label>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* University & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Üniversite
                </label>
                <Input
                  name="university"
                  placeholder="İstanbul Teknik Üni."
                  value={formData.university}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Bölüm
                </label>
                <Input
                  name="department"
                  placeholder="Bilgisayar Mühendisliği"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Internship Search Type & GitHub */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Aradığınız Staj / Pozisyon Türü
                </label>
                <select
                  name="internshipType"
                  value={formData.internshipType}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="Zorunlu Staj">Zorunlu Staj</option>
                  <option value="Gönüllü Staj">Gönüllü Staj</option>
                  <option value="Part-Time">Part-Time (Yarı Zamanlı)</option>
                  <option value="Tam Zamanlı">Tam Zamanlı (Full-Time)</option>
                  <option value="Aradığım Yok">Şu An Pozisyon Aradığı Yok</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  GitHub Adresi (İsteğe Bağlı)
                </label>
                <Input
                  name="githubUrl"
                  placeholder="https://github.com/kullaniciadi"
                  value={formData.githubUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full gap-2 py-5 font-semibold text-sm"
            >
              <UserPlus className="h-4 w-4" />
              {loading ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
            </Button>

            <p className="text-center text-xs text-slate-500">
              Zaten bir hesabınız var mı?{" "}
              <Link
                href="/login"
                className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Giriş Yapın
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
