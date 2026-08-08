import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, surname, email, password, university, department, internshipType, githubUrl } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Ad, E-posta ve Şifre alanları zorunludur." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu e-posta adresi ile kayıtlı kullanıcı zaten mevcut." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
        university,
        department,
        internshipType,
        githubUrl,
        skills: ["JavaScript", "TypeScript", "React"],
      },
    });

    return NextResponse.json(
      {
        message: "Kullanıcı başarıyla oluşturuldu.",
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Kayıt sırasında bir sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
