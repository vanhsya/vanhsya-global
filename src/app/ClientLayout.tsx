"use client";

import { useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import { CurrencyProvider } from "@/components/CurrencySelector";
import ContactSupport from "@/components/ContactSupport";
import ImmigrationConciergeChat from "@/components/ImmigrationConciergeChat";
import LogoPreloader from "@/components/LogoPreloader";
import TrustRibbon from "@/components/TrustRibbon";
import SystemStatusBanner from "@/components/SystemStatusBanner";
import { ErrorBoundary } from "@/components/ErrorHandling";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  useEffect(() => {
    // Safe wallet provider initialization - prevents "Cannot redefine property: ethereum"
    const initEthereumSafe = () => {
      if (typeof window === 'undefined') return;

      // Check if ethereum already exists
      if ('ethereum' in window) {
        const descriptor = Object.getOwnPropertyDescriptor(window, 'ethereum');
        if (descriptor && !descriptor.configurable) {
          // Non-configurable (MetaMask/etc) - wrap safely instead of redefining
          const originalProvider = (window as any).ethereum;
          const safeWrapper = {
            ...originalProvider,
            isMetaMask: originalProvider?.isMetaMask || false,
            isRabby: originalProvider?.isRabby || false,
            // Suppress conflicts silently
            request: async (...args: any[]) => originalProvider.request(...args),
            // Forward all other methods
          };
          
          // Define non-enumerable wrapper only if possible
          try {
            Object.defineProperty(window, '_vanhsya_ethereum_safe', {
              value: safeWrapper,
              configurable: true,
              enumerable: false,
              writable: true
            });
            console.log('✅ VANHSYA: Ethereum provider wrapped safely');
          } catch (e) {
            console.warn('⚠️ VANHSYA: Could not wrap ethereum (already safe)');
          }
          return;
        }
      }

      // Safe defineProperty for configurable or missing property
      try {
        const originalEthereum = (window as any).ethereum;
        Object.defineProperty(window, 'ethereum', {
          configurable: true,
          enumerable: false,
          get() { return originalEthereum; },
          set(val) { /* Ignore redefinition attempts */ }
        });
        console.log('✅ VANHSYA: Ethereum property defined safely');
      } catch (error) {
        console.warn('⚠️ VANHSYA: Ethereum defineProperty failed (safe fallback)', error);
      }
    };

    // Defer after extensions load
    requestAnimationFrame(() => {
      requestAnimationFrame(initEthereumSafe);
    });

    // Cleanup: restore original if we wrapped
    return () => {
      try {
        if ((window as any)._vanhsya_ethereum_safe) {
          delete (window as any)._vanhsya_ethereum_safe;
        }
      } catch (e) {
        // Cleanup is best-effort
      }
    };
  }, []);

  return (
    <>
      <ErrorBoundary>
        <CurrencyProvider>
          <TrustRibbon />
          <SystemStatusBanner />
          <LogoPreloader />
          <PageTransition>
            {children}
          </PageTransition>
          <ImmigrationConciergeChat />
          <ContactSupport variant="floating" />
        </CurrencyProvider>
      </ErrorBoundary>
    </>
  );
}
