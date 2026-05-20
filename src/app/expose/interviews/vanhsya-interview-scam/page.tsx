import type { Metadata } from "next";
import VanhsyaInterviewScamPage from "@/components/expose/VanhsyaInterviewScamPage";

export const metadata: Metadata = {
  title: "Vanhsya Interview Scam – Verified Evidence & Media | VANHSYA Expose",
  description:
    "A dedicated evidence hub for the Vanhsya Interview scam, including timelines, testimonies, statements, and media records. Items are shown only when sources are provided.",
};

export default function Page() {
  return <VanhsyaInterviewScamPage />;
}

