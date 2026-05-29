import { NextRequest, NextResponse } from 'next/server';

const FALLBACKS: Record<string, string> = {
  dialogue_fitness: "What's your current fitness level honestly, and do you have any injuries or health conditions I should know about?",
  dialogue_study: "What's your current knowledge level with this subject, and how many hours per week can you realistically commit?",
  dialogue_career: "Where are you right now in your career, and what specifically does 'progress' look like in 12 months?",
  dialogue_default: "Tell me about your biggest real constraint — the thing that's made past attempts harder than expected.",
  recalibrate: "I can see this task has been tough to stick with. Based on what you've shared, I'd suggest reducing the frequency from daily to 3x per week — that's still meaningful progress without the all-or-nothing pressure. Want me to update your plan?",
  coach: "Looking at your goals, the pattern I notice is that high-effort daily tasks are the ones slipping. Your consistency is strongest on focused, time-boxed work. I'd prioritize front-loading your hardest task before noon — your data suggests that's when you're sharpest.",
};

export async function POST(req: NextRequest) {
  const { messages, system, intent } = await req.json();

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    // Fallback for local dev without key
    const fallback = FALLBACKS[intent] ?? FALLBACKS['coach'];
    return NextResponse.json({ content: fallback });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: system },
          ...(messages ?? []),
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? FALLBACKS[intent] ?? FALLBACKS['coach'];
    return NextResponse.json({ content });
  } catch (e) {
    console.error('Groq API error:', e);
    const fallback = FALLBACKS[intent] ?? FALLBACKS['coach'];
    return NextResponse.json({ content: fallback });
  }
}
