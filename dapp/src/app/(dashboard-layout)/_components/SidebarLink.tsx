import { SidebarLinksType } from './Sidebar';
import SidebarLinkItem from './SidebarLinkItem';

interface SidebarLinkProps extends SidebarLinksType {
  isOpen: boolean;
  closeSidebar?: () => void;
}

const SidebarLink = (props: SidebarLinkProps) => {
  return (
    <li className='w-full' onClick={props.closeSidebar}>
      {props.href && <SidebarLinkItem {...props} href={props.href} />}
    </li>
  );
};

export default SidebarLink;
