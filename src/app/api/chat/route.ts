import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    console.log("Received messages:", messages);

    if (!process.env.DEEPSEEK_API_KEY) {
      console.error("Missing OPENAI_API_KEY in environment variables.");
      return NextResponse.json(
        { error: "Server misconfiguration: missing Deepseek API key." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey: process.env.DEEPSEL_API_KEY,
         baseURL: 'https://api.deepseek.com',
     });

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages,
    });

    console.log("OpenAI response:", completion);

    return NextResponse.json({ content: completion.choices[0].message.content });
  } catch (error: any) {
    console.error("Error in /api/chat route:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}