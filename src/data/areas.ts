import type { Area, AreaId } from '@/types';

export const AREAS: Area[] = [
  { id: 'fitness', label: 'Fitness', color: '#1B7A5C', soft: '#D9F0E5', emoji: '💪' },
  { id: 'study',   label: 'Study',   color: '#3D4D8A', soft: '#E3E7F4', emoji: '📚' },
  { id: 'career',  label: 'Career',  color: '#1F5A8A', soft: '#DCE9F4', emoji: '💼' },
  { id: 'diet',    label: 'Diet',    color: '#B8721C', soft: '#F8E6CB', emoji: '🍎' },
  { id: 'mind',    label: 'Mind',    color: '#7A2952', soft: '#F4DCE8', emoji: '🧠' },
  { id: 'money',   label: 'Money',   color: '#3B6212', soft: '#E5EFD7', emoji: '💰' },
  { id: 'health',  label: 'Health',  color: '#A8324B', soft: '#FBE3E8', emoji: '❤️' },
  { id: 'habits',  label: 'Habits',  color: '#5C4A8A', soft: '#E8E3F4', emoji: '🔄' },
  { id: 'custom',  label: 'Custom',  color: '#5F5648', soft: '#EDEAE2', emoji: '✨' },
];

export const areaById = (id: AreaId): Area =>
  AREAS.find((a) => a.id === id) ?? AREAS[AREAS.length - 1];

export const REASON_TAGS = [
  { id: 'tired',    label: 'Too tired',       icon: '😴' },
  { id: 'busy',     label: 'Unexpected work', icon: '💼' },
  { id: 'focus',    label: "Couldn't focus",  icon: '🌀' },
  { id: 'overwhelm',label: 'Overwhelmed',     icon: '🌊' },
  { id: 'forgot',   label: 'Forgot',          icon: '🤷' },
  { id: 'mood',     label: 'Bad mood',        icon: '☁️' },
  { id: 'body',     label: 'Body said no',    icon: '🤒' },
  { id: 'priority', label: "Didn't matter",   icon: '📉' },
] as const;
