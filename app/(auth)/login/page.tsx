"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Code2, LogIn, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push("/profile");
        router.refresh();
      }
    } catch (err) {
      setError("Giriş yapılırken bir hata oluştu.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-xl border-slate-200 dark:border-slate-800">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
            <Code2 className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold">devLonca'ya Giriş Yap</CardTitle>
          <CardDescription>
            Geliştirici hesabınıza giriş yaparak makaleleri inceleyin ve paylaşımlarda bulunun.
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

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                E-posta Adresi
              </label>
              <Input
                type="email"
                placeholder="ornek@ogrenci.edu.tr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Şifre
                </label>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full gap-2 py-5 font-semibold text-sm"
            >
              <LogIn className="h-4 w-4" />
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>

            <p className="text-center text-xs text-slate-500">
              Henüz bir hesabınız yok mu?{" "}
              <Link
                href="/register"
                className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Hemen Kaydolun
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
