import NavigationPremium from "@/components/NavigationPremium";
import Footer from "@/components/Footer";
import EmployerConnectSection from "@/components/EmployerConnectSection";

export default function EmployersPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <NavigationPremium />
      <div className="pt-24">
        <EmployerConnectSection />
      </div>
      <Footer />
    </main>
  );
}

