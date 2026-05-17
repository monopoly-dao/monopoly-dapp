import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sell Your Home Faster to Global Investors | Settley',
  description:
    'Skip estate agents. Complete in 30–45 days with pre-qualified global investors. No chain, no fall-throughs. Available in UK, US, Kenya.',
  openGraph: {
    title: 'Global Buyers. Faster Completion. | Settley',
    description:
      'Sell your home to a global network of investors. Faster than estate agents, fewer fall-throughs, transparent fees.',
    type: 'website',
  },
};

export default function SellersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
