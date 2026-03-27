import CountryPageTemplate from '@/components/CountryPageTemplate';
import { countryData } from '@/data/countryData';

export default function NewZealandPage() {
  return <CountryPageTemplate countryData={countryData.newzealand} />;
}

export const metadata = {
  title: "New Zealand Immigration Services - VANHSYA Global Migration",
  description: "Expert New Zealand immigration services. Skilled Migrant Category, Work to Residence, Student Visa, and more. 93% success rate with professional guidance.",
  keywords: "new zealand immigration, new zealand visa, skilled migrant category, nz work visa, nz student visa, new zealand migration"
};
