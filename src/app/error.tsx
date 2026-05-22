'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && pathname !== '/') router.replace('/');
  }, [pathname, router]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0A0A10] text-white flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="text-white font-extrabold text-xl">Something went wrong</div>
          <div className="mt-2 text-sm text-white/70">
            We redirected you to a safe page. If this keeps happening, try refreshing.
          </div>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => router.replace('/')}
              className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 font-bold"
            >
              Go Home
            </button>
            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 font-extrabold"
            >
              Retry
            </button>
          </div>
          <div className="mt-5 text-xs text-white/40 break-all">{error?.digest ?? ''}</div>
        </div>
      </body>
    </html>
  );
}

