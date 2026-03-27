import CountryPageTemplate from '@/components/CountryPageTemplate';
import { countryData } from '@/data/countryData';

export default function SingaporePage() {
  return <CountryPageTemplate countryData={countryData.singapore} />;
}

export const metadata = {
  title: "Singapore Immigration Services - VANHSYA Global Migration",
  description: "Expert Singapore immigration services. Employment Pass, Student Pass, Tech.Pass, EntrePass, and more. 87% success rate with professional guidance.",
  keywords: "singapore immigration, singapore visa, employment pass, singapore student visa, tech pass, singapore migration"
};
