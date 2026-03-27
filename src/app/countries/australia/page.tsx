import CountryPageTemplate from '@/components/CountryPageTemplate';
import { countryData } from '@/data/countryData';

export default function AustraliaPage() {
  return <CountryPageTemplate countryData={countryData.australia} />;
}

export const metadata = {
  title: "Australia Immigration Services - VANHSYA Global Migration",
  description: "Expert Australia immigration services. Skilled Independent 189, State Nomination 190, Student Visa 500, and more. 92% success rate with professional guidance.",
  keywords: "australia immigration, australia visa, skilled independent 189, australia PR, student visa australia, australia migration"
};
