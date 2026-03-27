import CountryPageTemplate from '@/components/CountryPageTemplate';

const canadaData = {
  name: "Canada",
  flag: "🇨🇦",
  description: "Canada offers world-class education, excellent healthcare, and abundant opportunities for immigrants through various pathways including Express Entry, Provincial Nominee Programs, and family sponsorship.",
  capital: "Ottawa",
  population: "38.2 million",
  language: "English, French",
  currency: "CAD",
  heroGradient: "bg-gradient-to-br from-red-50 to-blue-50",
  primaryColor: "red",
  immigrationTarget: "400,000+ annually",
  successRate: "85%",
  averageProcessing: "6-18 months",
  programs: [
    {
      name: "Express Entry",
      description: "Federal skilled worker program for permanent residence",
      basePrice: 1325,
      processingTime: "6-8 months",
      popularity: 95,
      requirements: ["Bachelor's degree", "IELTS 6.5+", "3+ years work experience"],
      success: "85%",
      icon: "⚡"
    },
    {
      name: "Provincial Nominee Program",
      description: "Province-specific immigration programs",
      basePrice: 1500,
      processingTime: "12-18 months",
      popularity: 88,
      requirements: ["Job offer or skills in demand", "IELTS 6.0+", "Education credentials"],
      success: "90%",
      icon: "🏞️"
    },
    {
      name: "Family Sponsorship",
      description: "Sponsor spouse, children, parents, or grandparents",
      basePrice: 1080,
      processingTime: "12-24 months",
      popularity: 75,
      requirements: ["Canadian citizen/PR sponsor", "Financial support proof", "Relationship evidence"],
      success: "95%",
      icon: "👨‍👩‍👧‍👦"
    }
  ],
  benefits: [
    {
      title: "Universal Healthcare",
      description: "Free medical care for all residents",
      icon: "🏥"
    },
    {
      title: "Quality Education",
      description: "World-class education system",
      icon: "🎓"
    },
    {
      title: "Strong Economy",
      description: "Stable job market and opportunities",
      icon: "💼"
    }
  ],
  whyChoose: [
    {
      title: "High Quality of Life",
      description: "Canada consistently ranks among the top countries for quality of life"
    },
    {
      title: "Multicultural Society",
      description: "Welcoming environment for people from all backgrounds"
    },
    {
      title: "Path to Citizenship",
      description: "Clear pathway from permanent residence to citizenship"
    }
  ],
  stats: [
    { value: "1.4%", label: "Population Growth" },
    { value: "400,000+", label: "Immigrants per Year" },
    { value: "5.2%", label: "Unemployment Rate" },
    { value: "$65,000", label: "Average Salary" }
  ]
};

export default function CanadaPage() {
  return <CountryPageTemplate countryData={canadaData} />;
}
