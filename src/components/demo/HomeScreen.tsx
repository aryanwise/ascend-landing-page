'use client';
import { useState } from 'react';
import { Flame, Plus, CheckCircle2, Circle, X, Zap } from 'lucide-react';
import type { Goal, Priority } from '@/types';
import { areaById } from '@/data/areas';

interface HomeScreenProps {
  goals: Goal[];
  priorities: Priority[];
  completions: Record<string, Record<string, boolean>>;
  energy: 'low' | 'medium' | 'high' | null;
  onAddPriority: (text: string) => void;
  onTogglePriority: (id: string) => void;
  onRemovePriority: (id: string) => void;
  onToggleTask: (goalId: string, taskId: string) => void;
  onSetEnergy: (level: 'low' | 'medium' | 'high') => void;
}

export default function HomeScreen({ goals, priorities, completions, energy, onAddPriority, onTogglePriority, onRemovePriority, onToggleTask, onSetEnergy }: HomeScreenProps) {
  const [newPri, setNewPri] = useState('');

  const activeTasks = goals.flatMap(g =>
    g.plan.dailyTasks.slice(0, 3).map(t => ({ goal: g, task: t, done: completions[g.id]?.[t.id] ?? false }))
  );
  const doneCount = activeTasks.filter(t => t.done).length;
  const streak = doneCount > 0 ? 1 : 0;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const addPri = () => {
    if (!newPri.trim()) return;
    onAddPriority(newPri.trim());
    setNewPri('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <div style={{ padding: '14px 16px 10px', flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: '#6B6359' }}>{greeting}</div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px', color: '#1A1815', lineHeight: 1.1 }}>
          {doneCount > 0 ? 'Making progress.' : 'Recalibrate.'}
        </div>
      </div>

      <div style={{ padding: '0 16px', overflowY: 'auto', flex: 1, paddingBottom: 12 }}>
        {/* Streak card */}
        <div style={{ background: '#1A1815', borderRadius: 18, padding: '14px 16px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Streak</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 30, fontWeight: 700, color: '#fff', lineHeight: 1.1, marginTop: 4 }}>
              {streak} <span style={{ fontSize: 12, opacity: 0.45, fontWeight: 500 }}>day</span>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>{doneCount} of {activeTasks.length} tasks done today</div>
          </div>
          <div style={{ background: '#D9531E', borderRadius: 12, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={20} color="#fff" />
          </div>
        </div>

        {/* Energy */}
        {!energy && (
          <div style={{ background: '#F8E6CB', borderRadius: 14, padding: '12px 14px', marginBottom: 12, border: '1px solid rgba(184,114,28,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
              <Zap size={12} color="#B8721C" />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#B8721C' }}>How's your energy today?</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {(['low', 'medium', 'high'] as const).map(e => (
                <button key={e} onClick={() => onSetEnergy(e)} style={{ flex: 1, padding: '7px 4px', background: '#fff', border: 'none', borderRadius: 9, fontSize: 11, fontWeight: 600, cursor: 'pointer', color: '#1A1815' }}>
                  {e === 'low' ? '🪫' : e === 'medium' ? '🔋' : '⚡'} {e.charAt(0).toUpperCase() + e.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Priorities */}
        <SLabel>Today's Priorities</SLabel>
        <div style={{ background: '#fff', borderRadius: 14, padding: 12, border: '1px solid rgba(26,24,21,0.08)', marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: priorities.length > 0 ? 10 : 0 }}>
            <input value={newPri} onChange={e => setNewPri(e.target.value)} onKeyDown={e => e.key === 'Enter' && addPri()} placeholder="What MUST happen today?" style={{ flex: 1, padding: '8px 11px', borderRadius: 9, border: 'none', background: '#FBF9F4', fontSize: 12, color: '#1A1815', outline: 'none' }} />
            <button onClick={addPri} disabled={!newPri.trim()} style={{ width: 32, height: 32, borderRadius: 9, background: '#D9531E', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: newPri.trim() ? 1 : 0.4 }}>
              <Plus size={14} color="#fff" />
            </button>
          </div>
          {priorities.length === 0
            ? <div style={{ textAlign: 'center', fontSize: 11, color: '#A8A095', fontStyle: 'italic', padding: '4px 0' }}>Pin 1–3 must-dos. The rest is bonus.</div>
            : priorities.map((p, i) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 9, paddingTop: 9, borderTop: i > 0 ? '1px solid rgba(26,24,21,0.06)' : 'none' }}>
                  <button onClick={() => onTogglePriority(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}>
                    {p.done ? <CheckCircle2 size={18} color="#D9531E" fill="#FFE9DD" /> : <Circle size={18} color="#A8A095" />}
                  </button>
                  <div style={{ width: 18, height: 18, borderRadius: 5, background: i === 0 ? '#D9531E' : i === 1 ? '#B8721C' : '#A8A095', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#fff' }}>P{i + 1}</span>
                  </div>
                  <span style={{ flex: 1, fontSize: 12, fontWeight: 500, color: p.done ? '#A8A095' : '#1A1815', textDecoration: p.done ? 'line-through' : 'none' }}>{p.text}</span>
                  <button onClick={() => onRemovePriority(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.35, padding: 3 }}>
                    <X size={13} />
                  </button>
                </div>
              ))
          }
        </div>

        {/* Tasks */}
        <SLabel>Today's tasks</SLabel>
        {activeTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px 0', fontSize: 12, color: '#A8A095' }}>No tasks yet — create a goal to start.</div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(26,24,21,0.08)' }}>
            {activeTasks.map(({ goal, task, done }, i) => {
              const a = areaById(goal.area);
              return (
                <button key={`${goal.id}-${task.id}`} onClick={() => onToggleTask(goal.id, task.id)} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 12px', width: '100%', background: 'none', border: 'none', borderTop: i > 0 ? '1px solid rgba(26,24,21,0.06)' : 'none', cursor: 'pointer', textAlign: 'left' }}>
                  {done
                    ? <CheckCircle2 size={19} style={{ color: a.color, fill: a.soft, flexShrink: 0 }} />
                    : <Circle size={19} color="#A8A095" style={{ flexShrink: 0 }} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: done ? '#A8A095' : '#1A1815', textDecoration: done ? 'line-through' : 'none' }}>{task.name}</div>
                    <div style={{ marginTop: 2 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 4, background: a.soft, color: a.color }}>{a.label}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function SLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#A8A095', marginBottom: 8 }}>{children}</div>;
}
