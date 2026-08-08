import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Giriş yapmanız gerekmektedir." },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { name, surname, bio, githubUrl, university, department, internshipType, skills } = body;

    const parsedSkills = Array.isArray(skills)
      ? skills
      : typeof skills === "string"
      ? skills.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        surname,
        bio,
        githubUrl,
        university,
        department,
        internshipType,
        skills: parsedSkills,
      },
    });

    return NextResponse.json({
      message: "Profil başarıyla güncellendi.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return NextResponse.json(
      { error: "Profil güncellenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
