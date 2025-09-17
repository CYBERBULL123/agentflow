'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutGrid,
  Bot,
  Workflow,
  Store,
  Puzzle,
  Bug,
  Settings,
} from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/agents', label: 'Agents', icon: Bot },
  { href: '/workflows', label: 'Workflows', icon: Workflow },
  { href: '/marketplace', label: 'Marketplace', icon: Store },
  { href: '/integrations', label: 'Integrations', icon: Puzzle },
  { href: '/debugging', label: 'Debugging', icon: Bug },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function NavMenu() {
  const pathname = usePathname();
  
  const isParentPathActive = (path: string) => {
    if (path === '/dashboard') return pathname === path;
    return pathname.startsWith(path);
  }

  return (
    <SidebarMenu>
      {menuItems.map(({ href, label, icon: Icon }) => (
        <SidebarMenuItem key={href}>
          <Link href={href}>
            <SidebarMenuButton
              isActive={isParentPathActive(href)}
              tooltip={label}
            >
              <Icon />
              <span>{label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
