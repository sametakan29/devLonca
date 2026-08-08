# 🚀 devLonca - Açık Kaynak Yazılım Topluluk Platformu (v0.1 MVP)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdevlonca%2Fdevlonca-platform)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black)](https://nextjs.org/)
[![Neon DB](https://img.shields.io/badge/Database-Neon_PostgreSQL-00E599)](https://neon.tech/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-5A67D8)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)

**devLonca**, yazılımcılar, bilgisayar mühendisliği öğrencileri ve açık kaynak tutkunları için tasarlanmış modern, modüler ve yüksek performanslı bir topluluk web platformudur.

---

## 📌 Proje Vizyonu & Amacı

Yazılım geliştiricilerin bilgi paylaşabileceği, takıldıkları konularda destek alabildiği, üniversite ve yetenek bilgilerini sergileyerek staj/kariyer fırsatlarına erişebildiği özgür bir platform inşa etmeyi hedefliyoruz.

### 🌟 v0.1 Temel Modüller Scope
1. **Auth & Kullanıcı Profili (`(dashboard)/profile`)**:
   - Kullanıcı kaydı / girişi (NextAuth.js & bcrypt)
   - Profil Detayları: Ad, Soyad, Bio, GitHub linki, Üniversite & Bölüm, Aradığı Staj Türü (Zorunlu Staj, Gönüllü Staj, Tam Zamanlı, Part-Time) ve Yetenek Etiketleri (Tags).
2. **Teknik Blog / Makaleler (`articles`)**:
   - Kullanıcıların teknik makale, rehber ve mimari yazılar yayınlayabileceği CRUD yapısı.
3. **Community Q&A (`questions`)**:
   - Yazılımcıların karşılaştıkları sorunları sorabildiği ve topluluktan çözümler alabileceği etkileşimli forum.

---

## 🛠️ Proje Mimarisi & Teknoloji Stack'i

Clean Architecture ve Vercel Serverless mimarisine %100 uyumlu teknoloji seçimleri:

```
devLonca Platform Architecture
├── Framework:        Next.js 14 (App Router, React Server Components, TypeScript)
├── Styling:          Tailwind CSS & CSS Variables (Dark/Light Mode Uyumlu)
├── Icons & UI:       Lucide Icons & Reusable UI Primitives (Button, Card, Badge, Input)
├── Database & ORM:   Neon Serverless PostgreSQL & Prisma ORM (Connection Pooling Supported)
├── Authentication:   NextAuth.js (Auth.js Credentials & Custom JWT Callbacks)
└── Deployment:       Vercel (Zero-Config Serverless Deployment)
```

---

## 📂 Dosya & Dizin Yapısı

Katkıda bulunacak geliştiricilerin kolayca uyum sağlayabilmesi için tasarlanmış klasör mimarisi:

```
/app
  ├── (auth)/        # Login & Register sayfaları
  ├── (dashboard)/   # Kullanıcı profili ve kişisel panel
  ├── articles/      # Blog / Makale liste, detay ve yeni yazı sayfaları
  ├── questions/     # Soru-Cevap forum alanı ve detay sayfaları
  ├── api/           # Next.js Route Handlers (Auth, Articles, Questions, Profile API)
  ├── globals.css    # Tailwind CSS & Tema renk değişkenleri
  ├── page.tsx       # Ana sayfa (Hero, Katıl butonu, İstatistikler, Son içerikler)
  └── layout.tsx     # Kök düzen (Navbar, Footer, ThemeProvider)
/components
  ├── ui/            # Reusable UI bileşenleri (Button, Input, Card, Badge)
  ├── Navbar.tsx     # Mobil drawer & Karanlık mod destekli responsive navigasyon
  ├── Footer.tsx     # Açık kaynak bağlantıları ve künye
  └── Providers.tsx  # NextAuth & ThemeProvider sarmalayıcıları
/lib
  ├── prisma.ts      # Singleton Prisma Client veritabanı bağlantısı
  ├── auth.ts        # NextAuth.js konfigürasyonu ve callback'leri
  └── utils.ts       # Yardımcı fonksiyonlar (cn, formatDate)
/prisma
  └── schema.prisma  # User, Article, Question, Answer, Tag modelleri (Neon directUrl destekli)
```

---

## 🐘 Neon PostgreSQL Veritabanı Kurulumu

[Neon.tech](https://neon.tech) üzerinde ücretsiz Serverless PostgreSQL veritabanı oluşturma adımları:

1. [Neon.tech](https://neon.tech) adresinde oturum açın ve **Create Project** butonuna basarak yeni bir proje oluşturun (`devlonca-db`).
2. Dashboard'da **Connection Details** bölümünden connection string'leri alın:
   - **Pooled connection string**: `DATABASE_URL` olarak kaydedin (Serverless Next.js API sorguları için).
   - **Direct connection string**: `DIRECT_URL` olarak kaydedin (Prisma migration / db push için).
3. `.env` dosyanıza veya Vercel Environment Variables bölümüne ekleyin.

---

## ⚡ Hızlı Kurulum Rehberi (Yerel Ortam)

### 1. Repoyu Klonlayın ve Bağımlılıkları Yükleyin
```bash
git clone https://github.com/devlonca/devlonca-platform.git
cd devlonca-platform
npm install
```

### 2. Çevre Değişkenlerini (`.env`) Ayarlayın
Kök dizinde `.env.example` dosyasını kopyalayarak `.env` oluşturun:

```bash
cp .env.example .env
```

Neon DB bağlantı adreslerinizi girin:
```env
DATABASE_URL="postgresql://user:pass@ep-cool-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://user:pass@ep-cool.us-east-2.aws.neon.tech/neondb?sslmode=require"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="devlonca-super-secret-key-change-in-production-12345"
```

### 3. Veritabanı Tablolarını Neon DB'ye Aktarın
```bash
# Tabloları Neon DB veritabanına push edin
npx prisma db push

# Prisma Client'ı generate edin
npx prisma generate
```

### 4. Geliştirici Sunucusunu Başlatın
```bash
npm run dev
```
Uygulama `http://localhost:3000` adresinde çalışmaya başlayacaktır! 🎉

---

## ☁️ Vercel Deployment Adım Adım Rehberi

1. Projenizi GitHub'a push edin.
2. [Vercel Dashboard](https://vercel.com/new) girin ve GitHub reponuzu bağlayın.
3. **Environment Variables** bölümüne şu değişkenleri ekleyin:
   - `DATABASE_URL`: Neon Pooled Connection String (örn: `postgresql://...-pooler.../neondb?sslmode=require`)
   - `DIRECT_URL`: Neon Direct Connection String (örn: `postgresql://.../neondb?sslmode=require`)
   - `NEXTAUTH_SECRET`: Rastgele oluşturulmuş gizli dize
   - `NEXTAUTH_URL`: Vercel domain adresiniz (örn: `https://devlonca.vercel.app`)
4. **Deploy** butonuna tıklayın! Vercel build script'i `npm run build` komutunu çalıştırarak Prisma Client'ı otomatik oluşturacak ve canlıya alacaktır.

---

## 🤝 Açık Kaynağa Katkı Sağlama (How to Contribute)

devLonca platformu **tamamen açık kaynaklıdır** ve topluluğun katkılarıyla büyür.

### 📜 Katkı Kuralları & PR (Pull Request) Akışı

1. **Issue İnceleme veya Oluşturma**:
   - Katkıda bulunmak istediğiniz özellik veya bug için bir Issue açın ya da var olan bir Issue'yu üstlenin.
2. **Fork & Branch Oluşturma**:
   - Repoyu fork edin ve açıklayıcı bir branch ismi açın:
     ```bash
     git checkout -b feat/makale-yorum-sistemi
     # veya bugfix için:
     git checkout -b fix/profile-avatar-upload
     ```
3. **Kod Standartları**:
   - TypeScript tiplerine sadık kalın (`any` kullanımından kaçının).
   - Yeni UI bileşenlerini `/components/ui/` dizinine modüler olarak ekleyin.
   - Tasarımlarda Tailwind CSS renk değişkenlerini (slate, indigo, emerald vb.) ve karanlık mod (`dark:`) uyumluluğunu koruyun.
4. **Commit Mesaj Standartları (Conventional Commits)**:
   - `feat: profil sayfasına sosyal medya linkleri eklendi`
   - `fix: soru detay sayfasındaki cevap sayısı hatası düzeltildi`
   - `docs: README veritabanı adımları güncellendi`
5. **PR Gönderme**:
   - Değişikliklerinizi `main` branch'ine PR olarak gönderin. PR açıklamasında yaptığınız değişiklikleri ve ilgili Issue numarasını belirtin.

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır. Özgürce çatallayabilir, değiştirebilir ve kullanabilirsiniz.

---

<p text-align="center">
  <b>devLonca</b> — Yazılımcılar Tarafından, Yazılımcılar İçin. ❤️
</p>
