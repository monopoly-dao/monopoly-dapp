import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { IconType } from 'react-icons';

type Props = {
  title: string;
  links: Array<{ label: string; href: string; icon?: LucideIcon | IconType }>;
};

export default function FooterColumnLinks({ title, links }: Props) {
  return (
    <div className='flex flex-col gap-6 text-black'>
      <p className='text-primary-light font-extrabold'>{title}</p>
      <div className='flex cursor-pointer items-start gap-3 flex-col'>
        {links.map((link) => {
          const { icon: Icon } = link;
          return (
            <Link
              href={link.href}
              key={link.label}
              className='py-2 text-sm font-medium flex items-center gap-3'
            >
              {Icon && <Icon className='text-2xl' />}
              <div>{link.label}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
