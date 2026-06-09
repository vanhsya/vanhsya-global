import NavigationPremium from "@/components/NavigationPremium";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TransparencyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <NavigationPremium />
      <div className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] shadow-lux p-6 sm:p-10">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-white/55">Policy</div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Transparency Policy</h1>
            <p className="mt-4 text-white/70 leading-relaxed">
              VANHSYA CONCIERGE 坚持透明与可验证：不承诺“100%包过”，不诱导用户进行高风险付款，不以恐吓式话术促成交易。
              我们强调流程可追踪、材料可核验、风险可解释，并提供反诈骗指引与曝光通道。
            </p>

            <div className="mt-8 space-y-5 text-white/70 leading-relaxed">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="text-white font-extrabold">1) 信息透明</div>
                <div className="mt-2 text-sm">
                  清晰说明路径要求、办理周期、材料清单与常见风险点；对不确定性与政策变化保持诚实披露。
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="text-white font-extrabold">2) 风险提示</div>
                <div className="mt-2 text-sm">
                  任何涉及“加急/内部渠道/关系户”的说法均应视为高风险信号。我们提供诈骗识别清单与求证路径。
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="text-white font-extrabold">3) 证据与核验</div>
                <div className="mt-2 text-sm">
                  关键文件、付款与沟通记录建议保留。遇到疑似欺诈，优先固定证据并通过正规渠道举报。
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/expose"
                className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-white font-extrabold transition-colors"
              >
                前往 Expose 透明平台
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border border-white/10 text-white font-extrabold transition-colors"
              >
                联系我们
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

