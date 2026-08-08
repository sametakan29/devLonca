import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get("tag");

    const where: any = {};
    if (tag) {
      where.tags = { has: tag };
    }

    const questions = await prisma.question.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            surname: true,
            university: true,
          },
        },
        _count: {
          select: { answers: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error("Fetch Questions Error:", error);
    return NextResponse.json(
      { error: "Sorular yüklenirken hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Soru sormak için giriş yapmalısınız." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, content, tags } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Başlık ve açıklama zorunludur." },
        { status: 400 }
      );
    }

    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];

    const question = await prisma.question.create({
      data: {
        title,
        content,
        tags: parsedTags,
        authorId: (session.user as any).id,
      },
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error("Create Question Error:", error);
    return NextResponse.json(
      { error: "Soru kaydedilirken hata oluştu." },
      { status: 500 }
    );
  }
}
