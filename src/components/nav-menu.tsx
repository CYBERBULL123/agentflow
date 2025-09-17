'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import {
  LayoutGrid,
  Bot,
  Workflow,
  Store,
  Puzzle,
  Bug,
  Settings,
  CreditCard,
  User,
  Zap,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const menuItems = [
  { 
    href: '/dashboard', 
    label: 'Dashboard', 
    icon: LayoutGrid,
    badge: null,
    description: 'Overview & Analytics'
  },
  { 
    href: '/agents', 
    label: 'AI Agents', 
    icon: Bot,
    badge: 'NEW',
    description: 'Create & Manage Agents'
  },
  { 
    href: '/workflows', 
    label: 'Workflows', 
    icon: Workflow,
    badge: null,
    description: 'Automation Flows'
  },
  { 
    href: '/marketplace', 
    label: 'Marketplace', 
    icon: Store,
    badge: 'HOT',
    description: 'Agent Templates'
  },
  { 
    href: '/integrations', 
    label: 'Integrations', 
    icon: Puzzle,
    badge: null,
    description: 'Connect Services'
  },
  { 
    href: '/billing', 
    label: 'Billing', 
    icon: CreditCard,
    badge: 'PRO',
    description: 'Plans & Usage'
  },
  { 
    href: '/debugging', 
    label: 'Debug Tools', 
    icon: Bug,
    badge: null,
    description: 'AI Debugging'
  },
];

const accountItems = [
  { 
    href: '/settings', 
    label: 'Settings', 
    icon: Settings,
    description: 'Preferences'
  },
  { 
    href: '/profile', 
    label: 'Profile', 
    icon: User,
    description: 'Account Info'
  },
];

export function NavMenu() {
  const pathname = usePathname();
  
  const isParentPathActive = (path: string) => {
    if (path === '/dashboard') return pathname === path;
    return pathname.startsWith(path);
  }

  const getBadgeVariant = (badge: string | null) => {
    switch (badge) {
      case 'NEW': return 'default';
      case 'HOT': return 'destructive';
      case 'PRO': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Navigation */}
      <SidebarMenu>
        <div className="px-5 mb-5">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Platform
          </h2>
        </div>
        {menuItems.map(({ href, label, icon: Icon, badge, description }) => (
          <SidebarMenuItem key={href}>
            <Link href={href}>
              <SidebarMenuButton
                isActive={isParentPathActive(href)}
                tooltip={`${label} - ${description}`}
                className="group relative overflow-hidden"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center justify-center w-5 h-5">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{label}</span>
                      {badge && (
                        <Badge 
                          variant={getBadgeVariant(badge)} 
                          className="ml-2 h-5 px-1.5 text-xs"
                        >
                          {badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {description}
                    </p>
                  </div>
                </div>
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      {/* Account Section */}
      <SidebarMenu>
        <div className="px-3 mb-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Account
          </h2>
        </div>
        {accountItems.map(({ href, label, icon: Icon, description }) => (
          <SidebarMenuItem key={href}>
            <Link href={href}>
              <SidebarMenuButton
                isActive={isParentPathActive(href)}
                tooltip={`${label} - ${description}`}
                className="group relative overflow-hidden"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center justify-center w-5 h-5">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="truncate">{label}</span>
                    <p className="text-xs text-muted-foreground truncate">
                      {description}
                    </p>
                  </div>
                </div>
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}
