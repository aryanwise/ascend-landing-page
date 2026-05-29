import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_PLAN = {
  advice: "Your energy is highest before noon — front-load the cognitively heavy work. Leave admin tasks for the afternoon dip.",
  blocks: [
    { time: "07:00", task: "Morning workout", duration: "45 min", area: "fitness", color: "#1B7A5C", soft: "#D9F0E5", done: false },
    { time: "08:00", task: "Protein breakfast + coffee", duration: "20 min", area: "nutrition", color: "#B8721C", soft: "#F8E6CB", done: false },
    { time: "08:30", task: "Deep study session", duration: "90 min", area: "study", color: "#3D4D8A", soft: "#E3E7F4", done: false },
    { time: "10:30", task: "Short walk + reset", duration: "15 min", area: "health", color: "#1B7A5C", soft: "#D9F0E5", done: false },
    { time: "11:00", task: "Practice problems / review", duration: "60 min", area: "study", color: "#3D4D8A", soft: "#E3E7F4", done: false },
    { time: "12:30", task: "Lunch break (no screens)", duration: "45 min", area: "health", color: "#1B7A5C", soft: "#D9F0E5", done: false },
    { time: "14:00", task: "Coach check-in / reflection", duration: "15 min", area: "mind", color: "#7A2952", soft: "#F4DCE8", done: false },
    { time: "19:00", task: "Evening mobility / stretch", duration: "20 min", area: "fitness", color: "#1B7A5C", soft: "#D9F0E5", done: false },
  ],
  deferred: [
    { task: "Inbox zero", reason: "Low energy afternoon task — better tomorrow morning" }
  ]
};

export async function POST(req: NextRequest) {
  const { goals, energy, hours } = await req.json();
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(FALLBACK_PLAN);
  }

  const goalList = (goals as Array<{ title: string; area: string; tasks: string[] }>)
    .map(g => `[${g.area}] ${g.title}: ${g.tasks.slice(0, 3).join(', ')}`)
    .join('\n');

  const system = `You are Ascend, a realistic AI day planner. Build a time-blocked schedule that's honest about what fits in ${hours} hours with ${energy} energy.

ACTIVE GOALS AND TASKS:
${goalList}

Rules:
- Schedule high-energy tasks before noon if energy is medium/high
- Include realistic breaks
- Defer what genuinely doesn't fit
- Return ONLY valid JSON, no markdown, no commentary

Output format:
{"advice":"<1-2 honest sentences>","blocks":[{"time":"HH:MM","task":"<short>","duration":"<e.g. 45 min>","area":"<area>","color":"#hex","soft":"#hex","done":false}],"deferred":[{"task":"<task>","reason":"<honest reason>"}]}

Use these area colors:
fitness: color #1B7A5C soft #D9F0E5
study: color #3D4D8A soft #E3E7F4  
nutrition: color #B8721C soft #F8E6CB
mind: color #7A2952 soft #F4DCE8
health: color #1B7A5C soft #D9F0E5
career: color #1F5A8A soft #DCE9F4
habits: color #5C4A8A soft #E8E3F4`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: system }, { role: 'user', content: 'Generate my day plan.' }],
        max_tokens: 800,
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content ?? '';

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const plan = JSON.parse(jsonMatch[0]);
      return NextResponse.json(plan);
    }
    throw new Error('No JSON in response');
  } catch (e) {
    console.error('Day plan error:', e);
    return NextResponse.json(FALLBACK_PLAN);
  }
}
