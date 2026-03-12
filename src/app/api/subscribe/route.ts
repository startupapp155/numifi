import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();

    const { error } = await supabase
      .from("subscribers")
      .insert({ email: sanitizedEmail, source: "waitlist" });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "You're already signed up!" },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      { message: "You're on the list!" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
