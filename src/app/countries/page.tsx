import type { Metadata } from 'next';
import CountriesLanding from '@/components/countries/CountriesLanding';

export const metadata: Metadata = {
  title: 'Immigration Destinations | VANHSYA',
  description:
    'Explore premium immigration destinations with pathway tags, key stats, and guided country overviews.'
};

export default function CountriesPage() {
  return <CountriesLanding />;
}
