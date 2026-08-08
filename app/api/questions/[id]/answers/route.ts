import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Yanıt yazmak için giriş yapmalısınız." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { content } = body;

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: "Yanıt içeriği boş olamaz." },
        { status: 400 }
      );
    }

    const answer = await prisma.answer.create({
      data: {
        content: content.trim(),
        questionId: params.id,
        authorId: (session.user as any).id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            surname: true,
            university: true,
            department: true,
          },
        },
      },
    });

    return NextResponse.json(answer, { status: 201 });
  } catch (error) {
    console.error("Create Answer Error:", error);
    return NextResponse.json(
      { error: "Yanıt gönderilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
