export type CardTier = 'standard' | 'pro' | 'elite' | 'black';

export type VanhsyaCard = {
  id: string;
  tier: CardTier;
  name: string;
  tagline: string;
  accent: 'silver' | 'gold' | 'violet';
  rewardsRate: string;
  fxFees: string;
  atmFees: string;
  concierge: string;
  limits: {
    dailySpend: string;
    monthlySpend: string;
  };
  perks: string[];
};

export const CARD_TIERS: { tier: CardTier; label: string; description: string }[] = [
  { tier: 'standard', label: 'Standard', description: 'Premium essentials for global spend' },
  { tier: 'pro', label: 'Pro', description: 'Higher rewards and upgraded limits' },
  { tier: 'elite', label: 'Elite', description: 'Priority support + travel benefits' },
  { tier: 'black', label: 'Black', description: 'Private-banking tier experience' }
];

export const VANHSYA_CARDS: VanhsyaCard[] = [
  {
    id: 'card_standard',
    tier: 'standard',
    name: 'VANHSYA Card — Standard',
    tagline: 'Precision spending with transparent rates.',
    accent: 'silver',
    rewardsRate: '1% cashback',
    fxFees: '0% FX markup',
    atmFees: 'Standard network fees',
    concierge: 'Email support',
    limits: { dailySpend: '$2,500', monthlySpend: '$25,000' },
    perks: [
      'Real-time card freeze',
      'Instant virtual card',
      'Global merchant acceptance',
      'Security alerts'
    ]
  },
  {
    id: 'card_pro',
    tier: 'pro',
    name: 'VANHSYA Card — Pro',
    tagline: 'More rewards. Higher ceilings.',
    accent: 'violet',
    rewardsRate: '3% cashback',
    fxFees: '0% FX markup',
    atmFees: 'Reduced network fees',
    concierge: 'Priority email support',
    limits: { dailySpend: '$7,500', monthlySpend: '$75,000' },
    perks: [
      'Priority dispute handling',
      'Enhanced spending insights',
      'Premium merchant offers',
      'Travel-safe controls'
    ]
  },
  {
    id: 'card_elite',
    tier: 'elite',
    name: 'VANHSYA Card — Elite',
    tagline: 'Designed for high-velocity global life.',
    accent: 'gold',
    rewardsRate: '5% cashback',
    fxFees: '0% FX markup',
    atmFees: 'Free withdrawals (select networks)',
    concierge: 'Concierge-lite',
    limits: { dailySpend: '$20,000', monthlySpend: '$200,000' },
    perks: [
      'Airport lounge privileges (limited)',
      'Travel insurance (limited)',
      'Priority verification',
      'White-glove onboarding'
    ]
  },
  {
    id: 'card_black',
    tier: 'black',
    name: 'VANHSYA Card — Black',
    tagline: 'Private-banking tier discretion.',
    accent: 'gold',
    rewardsRate: 'By invitation',
    fxFees: '0% FX markup',
    atmFees: 'Free withdrawals',
    concierge: 'Private concierge',
    limits: { dailySpend: 'Custom', monthlySpend: 'Custom' },
    perks: [
      'Dedicated account manager',
      'Priority everything',
      'Tailored travel coverage',
      'Exclusive partner access'
    ]
  }
];

export const getCardByTier = (tier: CardTier) => VANHSYA_CARDS.find((c) => c.tier === tier) || VANHSYA_CARDS[0];

