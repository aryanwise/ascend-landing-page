'use client';
import { useRef, useEffect, useState } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import type { ChatMessage, Goal } from '@/types';
import { COACH_SYSTEM } from '@/data/scripts';
import { askGroq } from '@/lib/utils';

interface CoachScreenProps {
  goals: Goal[];
  chat: ChatMessage[];
  onAddChat: (msg: ChatMessage) => void;
}

const SUGGESTIONS = [
  "What pattern do you see in my current goals?",
  "I keep procrastinating — what should I do?",
  "How do I stay consistent when I'm exhausted?",
  "Which goal should I focus on most right now?",
];

export default function CoachScreen({ goals, chat, onAddChat }: CoachScreenProps) {
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chat, thinking]);

  const send = async (text: string) => {
    if (!text.trim() || thinking) return;
    setInput('');
    onAddChat({ role: 'user', content: text.trim() });
    setThinking(true);
    try {
      const reply = await askGroq({
        system: COACH_SYSTEM(goals),
        messages: [...chat, { role: 'user', content: text.trim() }],
        intent: 'coach',
      });
      onAddChat({ role: 'assistant', content: reply });
    } catch {
      onAddChat({ role: 'assistant', content: "Connection issue — try again in a moment." });
    } finally {
      setThinking(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid rgba(26,24,21,0.06)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: '#D9531E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={17} color="#fff" />
        </div>
        <div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 700, color: '#1A1815' }}>Coach</div>
          <div style={{ fontSize: 10, color: '#6B6359', marginTop: 1 }}>⚖️ Balanced · knows your goals</div>
        </div>
      </div>

      {/* Chat */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {chat.length === 0 && (
          <div>
            <div style={{ fontSize: 11, color: '#A8A095', marginBottom: 10 }}>Ask anything. The coach knows your goals.</div>
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => send(s)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', background: '#fff', border: '1px solid rgba(26,24,21,0.08)', borderRadius: 11, fontSize: 12, color: '#1A1815', cursor: 'pointer', marginBottom: 6 }}>
                {s}
              </button>
            ))}
          </div>
        )}

        {chat.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '86%', padding: '10px 13px', borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', background: m.role === 'user' ? '#1A1815' : '#fff', border: m.role === 'assistant' ? '1px solid rgba(26,24,21,0.08)' : 'none', fontSize: 13, color: m.role === 'user' ? '#fff' : '#1A1815', lineHeight: 1.55 }}>
              {m.content}
            </div>
          </div>
        ))}

        {thinking && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#A8A095', fontSize: 12 }}>
            <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} />
            Thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: '10px 14px 14px', borderTop: '1px solid rgba(26,24,21,0.06)', display: 'flex', gap: 8, flexShrink: 0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(input)} placeholder="Be honest. Ask anything." disabled={thinking}
          style={{ flex: 1, padding: '10px 14px', borderRadius: 99, border: '1px solid rgba(26,24,21,0.1)', background: '#fff', fontSize: 13, color: '#1A1815', outline: 'none' }} />
        <button onClick={() => send(input)} disabled={!input.trim() || thinking}
          style={{ width: 38, height: 38, borderRadius: '50%', background: '#D9531E', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: (!input.trim() || thinking) ? 0.4 : 1 }}>
          <Send size={14} color="#fff" />
        </button>
      </div>
    </div>
  );
}
