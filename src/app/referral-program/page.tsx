import React from "react";
import NavigationPremium from "@/components/NavigationPremium";
import Footer from "@/components/Footer";
import EarnWithVanhsyaShell from "@/components/referral/EarnWithVanshyaShell";

export const metadata = {
  title: "Earn with Vanhsya | Referral Community",
  description:
    "Earn money through travel referrals with tiered rewards, RM support, and community stories. Unlock a premium travel package at 10 referrals.",
};

export default function ReferralProgramPage() {
  return (
    <main className="min-h-screen">
      <NavigationPremium variant="neo" />
      <EarnWithVanhsyaShell />
      <Footer />
    </main>
  );
}
