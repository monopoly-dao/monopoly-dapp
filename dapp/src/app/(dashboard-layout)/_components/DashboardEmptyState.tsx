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
    <div className='rounded-2xl border border-settley-primary/10 bg-[#F8F9FF] p-6'>
      <h3 className='font-playfair text-2xl font-bold text-navy'>{title}</h3>
      <p className='mt-3 max-w-2xl font-inter text-sm leading-relaxed text-[#3B3C4A]'>
        {body}
      </p>
      <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
        <Link
          href={primaryHref}
          className='w-fit rounded-full bg-navy px-5 py-3 font-inter text-sm font-medium text-white transition hover:bg-navy/90'
        >
          {primaryLabel}
        </Link>
        {secondaryHref && secondaryLabel && (
          <Link
            href={secondaryHref}
            className='w-fit rounded-full border border-navy px-5 py-3 font-inter text-sm font-medium text-navy transition hover:bg-navy/5'
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
