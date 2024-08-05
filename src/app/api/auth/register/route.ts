import { NextResponse } from "next/server";
import { db } from "@/server/db";
import bcrypt from "bcrypt";
import { z } from "zod";

type FormDataType = {
  email: string;
  name: string;
  password: string;
};

type Request = {
  json: () => Promise<FormDataType>;
};

const schema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = schema.parse(body);
    // Check if the user already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });

    // if user already exists, return error
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: ["User with Email already exists"] },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => err.message);
      return NextResponse.json(
        { user: null, message: errorMessages },
        { status: 400 },
      );
    }
  }
}
