'use client';
import { useState } from 'react';
import { X, Shield, ArrowRight, Sparkles, Loader2, Check } from 'lucide-react';
import { REASON_TAGS } from '@/data/areas';
import { RECALIBRATE_SYSTEM } from '@/data/scripts';
import { askGroq } from '@/lib/utils';
import type { Goal, ChatMessage } from '@/types';

interface RecalibrateModalProps {
  goal: Goal;
  taskId: string;
  chat: ChatMessage[];
  onAddChat: (msg: ChatMessage) => void;
  onApply: (goalId: string, taskId: string, changes: { name?: string; frequency?: string; duration?: string }) => void;
  onClose: () => void;
}

export default function RecalibrateModal({ goal, taskId, chat, onAddChat, onApply, onClose }: RecalibrateModalProps) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState('');

  const task = goal.plan.dailyTasks.find(t => t.id === taskId);

  const toggleTag = (id: string) => setTags(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const getProposal = async () => {
    setLoading(true);
    setStep(1);
    try {
      const reply = await askGroq({
        system: RECALIBRATE_SYSTEM(goal.title, task?.name ?? 'this task', tags),
        messages: [],
        intent: 'recalibrate',
      });
      setProposal(reply);
      onAddChat({ role: 'assistant', content: reply });
      setStep(2);
    } catch {
      const fallback = `Twice in a row is a clear signal — not a character flaw. Let's reduce "${task?.name}" from daily to 3x per week so you can actually win at it instead of feeling behind. Want me to update your plan?`;
      setProposal(fallback);
      onAddChat({ role: 'assistant', content: fallback });
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const apply = () => {
    onApply(goal.id, taskId, {
      name: task?.name ?? 'Task',
      frequency: 'weekly:Mon,Wed,Fri',
      duration: task?.duration ?? '30 min',
    });
    onClose();
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'flex-end', zIndex: 50, borderRadius: 40, overflow: 'hidden' }}>
      <div style={{ width: '100%', background: '#F8F5EF', borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: '90%', display: 'flex', flexDirection: 'column', animation: 'slideUp 0.35s ease-out' }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(26,24,21,0.2)', margin: '10px auto 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px 8px' }}>
          <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 700, color: '#1A1815' }}>Let's recalibrate</h3>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: '50%', background: '#FBF9F4', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={13} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 20px' }}>
          {/* Step 0: reason tags */}
          {step === 0 && (
            <>
              <div style={{ display: 'flex', gap: 9, background: '#FFE9DD', borderRadius: 12, padding: '11px 12px', marginBottom: 14 }}>
                <Shield size={15} color="#D9531E" style={{ flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#D9531E' }}>This isn't failure.</div>
                  <div style={{ fontSize: 11, color: '#1A1815', marginTop: 3, lineHeight: 1.5 }}>
                    <strong>"{task?.name}"</strong> got missed {goal.missedDays}× in a row. That's a signal — the plan needs to flex around your reality.
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#A8A095', marginBottom: 10 }}>
                What's been getting in the way?
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 }}>
                {REASON_TAGS.map(t => {
                  const sel = tags.includes(t.id);
                  return (
                    <button key={t.id} onClick={() => toggleTag(t.id)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 10px', borderRadius: 10, border: '1px solid rgba(26,24,21,0.08)', background: sel ? '#1A1815' : '#fff', cursor: 'pointer', textAlign: 'left' }}>
                      <span style={{ fontSize: 14 }}>{t.icon}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: sel ? '#fff' : '#1A1815' }}>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              <button onClick={getProposal} disabled={tags.length === 0} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', padding: '13px', background: '#D9531E', color: '#fff', border: 'none', borderRadius: 13, fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: tags.length === 0 ? 0.4 : 1 }}>
                Get AI proposal <Sparkles size={14} />
              </button>
            </>
          )}

          {/* Step 1: loading */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', gap: 12 }}>
              <Loader2 size={24} color="#D9531E" style={{ animation: 'spin 1s linear infinite' }} />
              <div style={{ fontSize: 13, color: '#6B6359', textAlign: 'center' }}>Coach is analysing your pattern...</div>
            </div>
          )}

          {/* Step 2: proposal */}
          {step === 2 && proposal && (
            <>
              <div style={{ background: '#fff', borderRadius: 13, border: '1px solid rgba(26,24,21,0.08)', padding: '13px', marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#1A1815', lineHeight: 1.6 }}>{proposal}</div>
              </div>

              <div style={{ background: '#FFE9DD', borderRadius: 12, padding: '12px 13px', marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#D9531E', marginBottom: 8 }}>Proposed change</div>
                <div style={{ fontSize: 12, color: '#1A1815', marginBottom: 4 }}><strong>Frequency:</strong> Mon, Wed, Fri (3× per week)</div>
                <div style={{ fontSize: 12, color: '#1A1815' }}><strong>Duration:</strong> {task?.duration ?? '30 min'} (unchanged)</div>
                <div style={{ fontSize: 10, color: '#B33E0E', marginTop: 8, fontStyle: 'italic' }}>3× beats daily-but-skipping every time.</div>
              </div>

              <button onClick={apply} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', padding: '13px', background: '#D9531E', color: '#fff', border: 'none', borderRadius: 13, fontSize: 13, fontWeight: 700, cursor: 'pointer', marginBottom: 8 }}>
                <Check size={14} /> Accept — update my plan
              </button>
              <button onClick={onClose} style={{ width: '100%', padding: '11px', background: 'transparent', border: '1px solid rgba(26,24,21,0.1)', borderRadius: 12, fontSize: 12, fontWeight: 600, color: '#6B6359', cursor: 'pointer' }}>
                Not now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
