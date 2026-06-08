import Link from 'next/link';

type Props = {
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  title: string;
};

export default function DashboardEmptyState({
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  title,
}: Props) {
  return (
    <div className='rounded-[8px] border border-[#D6D3D1] bg-cream p-6 sm:p-8'>
      <h3 className='text-2xl font-medium text-[#1C1917]'>{title}</h3>
      <p className='mt-3 max-w-2xl text-[#44403C]'>{body}</p>
      <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
        <Link
          href={primaryHref}
          className='w-fit rounded-[6px] bg-navy px-5 py-3 font-medium text-white'
        >
          {primaryLabel}
        </Link>
        {secondaryHref && secondaryLabel && (
          <Link
            href={secondaryHref}
            className='w-fit rounded-[6px] border border-navy px-5 py-3 font-medium text-navy'
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
