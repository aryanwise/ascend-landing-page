interface GroqRequest {
  system: string;
  messages?: { role: 'user' | 'assistant'; content: string }[];
  intent?: string;
}

export async function askGroq({ system, messages = [], intent = 'coach' }: GroqRequest): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ system, messages, intent }),
  });
  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  return data.content as string;
}

export async function generateDayPlan(goals: Array<{ title: string; area: string; tasks: string[] }>, energy: string, hours: number) {
  const res = await fetch('/api/day-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ goals, energy, hours }),
  });
  if (!res.ok) throw new Error('API error');
  return res.json();
}

export function formatFrequency(freq: string): string {
  if (!freq || freq === 'daily') return 'Every day';
  if (freq.startsWith('weekly:')) {
    const part = freq.split(':')[1];
    if (/^\d+x$/.test(part)) return `${part} per week`;
    return part.split(',').join(', ');
  }
  return freq;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
