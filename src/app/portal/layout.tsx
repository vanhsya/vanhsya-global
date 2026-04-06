import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portal | VANHSYA',
  description: 'Client portal'
};

export default function PortalLayout({
  children,
}: {
  children: ReactNode
}) {
  return children;
}
