import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { IconType } from 'react-icons';

type Props = {
  title: string;
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon | IconType;
    openInNewTab?: boolean;
  }>;
};

export default function FooterColumnLinks({ title, links }: Props) {
  return (
    <div className='flex flex-col w-full'>
      <p className='text-white/50 font-general-sans text-xs font-bold tracking-widest uppercase mb-6'>
        {title}
      </p>
      <div className='flex flex-col gap-3'>
        {links.map((link) => {
          const { icon: Icon, openInNewTab } = link;
          return (
            <Link
              href={link.href}
              key={link.label}
              target={openInNewTab ? '_blank' : '_self'}
              className='text-sm font-inter text-white/80 hover:text-white transition-colors flex items-center gap-2'
            >
              {Icon && <Icon className='text-lg' />}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
