import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unlock Home Equity Without Selling | Settley',
  description:
    'Sell 10–40% of your home to investors and keep living in it. Funds in 7–14 days. No monthly payments. Available in UK, US, Kenya.',
  openGraph: {
    title: 'Keep Your Home. Unlock Its Value. | Settley',
    description:
      'Unlock liquidity from your home without selling. No monthly payments, no debt. Just flexible equity release.',
    type: 'website',
  },
};

export default function HomeownersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
