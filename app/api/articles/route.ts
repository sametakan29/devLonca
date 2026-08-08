import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get("tag");

    const where: any = { published: true };
    if (tag) {
      where.tags = { has: tag };
    }

    const articles = await prisma.article.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatarUrl: true,
            university: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Fetch Articles Error:", error);
    return NextResponse.json(
      { error: "Makaleler yüklenirken hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Makale yayınlamak için giriş yapmalısınız." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, content, summary, tags } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Başlık ve içerik alanları zorunludur." },
        { status: 400 }
      );
    }

    // Generate simple slug
    const slugBase = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    const slug = `${slugBase}-${Date.now()}`;

    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        summary: summary || content.substring(0, 160),
        tags: parsedTags,
        authorId: (session.user as any).id,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Create Article Error:", error);
    return NextResponse.json(
      { error: "Makale kaydedilirken hata oluştu." },
      { status: 500 }
    );
  }
}
