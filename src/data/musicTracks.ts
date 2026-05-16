export type MusicCategory =
  | 'Vanhsya Matrix (Global Mix)'
  | 'World Without Borders'
  | 'System Anthem'
  | 'Global Mode'
  | 'Vanhsya Mode'
  | 'Secret Gem'
  | 'The Path'
  | 'The Code';

export type MusicTrack = {
  id: string;
  title: string;
  category: MusicCategory;
  fileName: string;
  description?: string;
  tags?: string[];
};

const TRACKS: MusicTrack[] = [
  {
    id: 'vanhsya-matrix-global-mix',
    title: 'Vanhsya Matrix (Global Mix)',
    category: 'Vanhsya Matrix (Global Mix)',
    fileName: 'Vanhsya Matrix (Global Mix).m4a.mp4',
  },
  {
    id: 'world-without-borders-take1',
    title: 'VANHSYA — The World Without Borders (Take 1)',
    category: 'World Without Borders',
    fileName: 'VANHSYA — The World Without Borders (Take 1).m4a.mp4',
  },
  {
    id: 'world-without-borders-take2',
    title: 'VANHSYA — The World Without Borders (Take 2)',
    category: 'World Without Borders',
    fileName: 'VANHSYA — The World Without Borders (Take 2).m4a.mp4',
  },
  {
    id: 'digital-sovereign-v1',
    title: 'VANHSYA DIGITAL SOVEREIGN (System Anthem V1)',
    category: 'System Anthem',
    fileName: 'VANHSYA DIGITAL SOVEREIGN (System Anthem V1).m4a.mp4',
  },
  {
    id: 'digital-sovereign-v2',
    title: 'VANHSYA DIGITAL SOVEREIGN (System Anthem V2)',
    category: 'System Anthem',
    fileName: 'VANHSYA DIGITAL SOVEREIGN (System Anthem V2).m4a.mp4',
  },
  {
    id: 'global-mode-v1',
    title: 'VANHSYA GLOBAL MODE (System Anthem V1)',
    category: 'Global Mode',
    fileName: 'VANHSYA GLOBAL MODE (System Anthem V1).m4a.mp4',
  },
  {
    id: 'global-anthem-v2',
    title: 'VANHSYA GLOBAL ANTHEM (V2)',
    category: 'Global Mode',
    fileName: 'VANHSYA GLOBAL ANTHEM (V2).m4a.mp4',
  },
  {
    id: 'global-anthem-v1',
    title: 'VANHSYA GLOBAL ANTHEM (V1)',
    category: 'Global Mode',
    fileName: 'VANHSYA GLOBAL ANTHEM (V1).m4a.mp4',
  },
  {
    id: 'global-mode-v2',
    title: 'VANHSYA GLOBAL MODE (System Anthem V2)',
    category: 'Global Mode',
    fileName: 'VANHSYA GLOBAL MODE (System Anthem V2).m4a.mp4',
  },
  {
    id: 'vanhsya-mode-drill',
    title: 'VANHSYA MODE (Drill Version)',
    category: 'Vanhsya Mode',
    fileName: 'VANHSYA MODE (Drill Version).m4a.mp4',
  },
  {
    id: 'secret-gem',
    title: 'Vanhsya Global The Secret Gem',
    category: 'Secret Gem',
    fileName: 'Vanhsya Global The Secret Gem.m4a.mp4',
  },
  {
    id: 'global-mode-v2-dup',
    title: 'VANHSYA GLOBAL MODE (V2)',
    category: 'Global Mode',
    fileName: 'VANHSYA GLOBAL MODE (V2).m4a.mp4',
  },
  {
    id: 'global-mode-v1-dup',
    title: 'VANHSYA GLOBAL MODE (V1)',
    category: 'Global Mode',
    fileName: 'VANHSYA GLOBAL MODE (V1).m4a.mp4',
  },
  {
    id: 'mode-full-technical-v1',
    title: 'VANHSYA MODE (Full Technical V1)',
    category: 'Vanhsya Mode',
    fileName: 'VANHSYA MODE (Full Technical V1).m4a.mp4',
  },
  {
    id: 'mode-full-technical-v2',
    title: 'VANHSYA MODE (Full Technical V2)',
    category: 'Vanhsya Mode',
    fileName: 'VANHSYA MODE (Full Technical V2).m4a.mp4',
  },
  {
    id: 'mode-premium-trap',
    title: 'VANHSYA MODE (Premium Trap)',
    category: 'Vanhsya Mode',
    fileName: 'VANHSYA MODE (Premium Trap).m4a.mp4',
  },
  {
    id: 'mode-harami-drill-v1',
    title: 'VANHSYA MODE HARAMI (Drill V1)',
    category: 'Vanhsya Mode',
    fileName: 'VANHSYA MODE HARAMI (Drill V1).m4a.mp4',
  },
  {
    id: 'path',
    title: 'VANHSYA The Path',
    category: 'The Path',
    fileName: 'VANHSYA The Path.m4a.mp4',
  },
  {
    id: 'path-1',
    title: 'VANHSYA The Path_1',
    category: 'The Path',
    fileName: 'VANHSYA The Path_1.m4a.mp4',
  },
  {
    id: 'the-code-viral-v2',
    title: 'VANHSYA THE CODE (Viral Global V2)',
    category: 'The Code',
    fileName: 'VANHSYA THE CODE (Viral Global V2).m4a.mp4',
  },
  {
    id: 'the-code-viral-v1',
    title: 'VANHSYA THE CODE (Viral Global V1)',
    category: 'The Code',
    fileName: 'VANHSYA THE CODE (Viral Global V1).m4a.mp4',
  },
];

export function getAllTracks(): MusicTrack[] {
  return TRACKS;
}

export function getCategories(): MusicCategory[] {
  return Array.from(new Set(TRACKS.map((t) => t.category))) as MusicCategory[];
}
