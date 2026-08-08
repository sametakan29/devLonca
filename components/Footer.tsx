import Link from "next/link";
import { Code2, Github, Heart, Globe, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Code2 className="h-4 w-4" />
              </div>
              <span>devLonca</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Yazılımcılar, öğrenciler ve açık kaynak tutkunları için topluluk odaklı, özgür bilgi ve deneyim paylaşım platformu.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Terminal className="h-3.5 w-3.5" /> Next.js 14 App Router
              </span>
              <span>•</span>
              <span>Open Source MIT</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">Modüller</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/articles" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Teknik Makaleler
                </Link>
              </li>
              <li>
                <Link href="/questions" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Topluluk Soru & Cevap
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Geliştirici Profili
                </Link>
              </li>
            </ul>
          </div>

          {/* Open Source Links */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">Açık Kaynak</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Github className="h-4 w-4" /> GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Katkıda Bulunma Rehberi
                </a>
              </li>
              <li>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Globe className="h-3.5 w-3.5" /> Vercel Deployment
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} devLonca Community. Tüm hakları açık kaynaktır.</p>
          <p className="flex items-center gap-1">
            Geliştirici topluluğu tarafından <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 inline" /> ile üretildi.
          </p>
        </div>
      </div>
    </footer>
  );
}
