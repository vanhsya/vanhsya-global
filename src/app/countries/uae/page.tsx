import CountryPageTemplate from '@/components/CountryPageTemplate';
import { countryData } from '@/data/countryData';

export default function UAEPage() {
  return <CountryPageTemplate countryData={countryData.uae} />;
}

export const metadata = {
  title: "UAE Immigration Services - VANHSYA Global Migration",
  description: "Expert UAE immigration services. Golden Visa, Employment Visa, Student Visa, Investor Visa, and more. 94% success rate with professional guidance.",
  keywords: "uae immigration, uae visa, golden visa uae, employment visa uae, uae student visa, dubai visa, abu dhabi visa"
};
