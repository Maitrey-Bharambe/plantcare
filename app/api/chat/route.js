import { Groq } from "groq-sdk";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "This is the plantcare assistant bot for household's plants to suggest water timing and Fertilizer's Suggestion",
        },
        { role: "user", content: message },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      reasoning_effort: "medium",
      stop: null,
    });

    // Get the response text directly
    const responseText = chatCompletion.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ response: responseText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API /api/chat error:", error);
    return new Response(
      JSON.stringify({ response: "Sorry, something went wrong." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
