import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sell Development Inventory to Global Investors | Settley',
  description:
    'Move units faster with Settley\'s global investor network. Off-plan sales, bulk purchases, fractional structures. Available in UK, US, Kenya.',
  openGraph: {
    title: 'Move Inventory Faster. Reach Investors Globally. | Settley',
    description:
      'Settley helps developers sell units to pre-qualified global investors. Faster sales, certain completion, flexible structures.',
    type: 'website',
  },
};

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
