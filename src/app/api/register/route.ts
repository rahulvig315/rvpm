import { prisma } from "@/app/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = (await req.json()) as {
            email: string;
            password: string;
        };
        const hashed_password = await hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashed_password,
            },
        });

        return NextResponse.json({
            user: {
                email: user.email,
            },
        });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}
