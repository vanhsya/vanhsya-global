'use client';

type Language = { code: string; label: string };

const LANGUAGES: Language[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ar', label: 'Arabic' },
  { code: 'fr', label: 'French' },
  { code: 'es', label: 'Spanish' }
];

export default function LanguageSelect(props: {
  value: string;
  onChange: (next: string) => void;
  ariaLabel?: string;
}) {
  return (
    <select
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      aria-label={props.ariaLabel || 'Language'}
      className="h-11 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
    >
      {LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}

