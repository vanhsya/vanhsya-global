"use client";

import dynamic from "next/dynamic";

const EarnWithVanshya = dynamic(() => import("./EarnWithVanshya"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
    </div>
  ),
});

export default function EarnWithVanhsyaShell() {
  return <EarnWithVanshya />;
}
