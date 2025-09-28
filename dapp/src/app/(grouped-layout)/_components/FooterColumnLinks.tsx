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
    <div className='flex flex-col text-black w-full'>
      <p className='text-[#00000099] font-general-sans text-[13px] font-medium tracking-[2px]'>
        {title}
      </p>
      <div className='flex cursor-pointer items-start flex-col'>
        {links.map((link) => {
          const { icon: Icon, openInNewTab } = link;
          return (
            <Link
              href={link.href}
              key={link.label}
              target={openInNewTab ? '_blank' : '_self'}
              className='py-[10px] text-sm font-roboto flex items-center gap-3'
            >
              {Icon && <Icon className='text-xl' />}
              <div>{link.label}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
