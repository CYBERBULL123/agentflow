'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  Search,
  Bell,
  Plus,
  Sparkles,
  Command,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { UserNav } from '@/components/user-nav';
import { Logo } from '@/components/logo';
import { useAuth } from '@/hooks/use-auth';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const platformItems = [
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

export function HeaderNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, userData } = useAuth();

  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === path;
    return pathname.startsWith(path);
  };

  const getBadgeVariant = (badge: string | null) => {
    switch (badge) {
      case 'NEW': return 'default';
      case 'HOT': return 'destructive';
      case 'PRO': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-4 min-w-0">
          <Logo />
          <Badge variant="secondary" className="hidden md:flex items-center text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center max-w-2xl mx-8">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {/* Platform Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Platform
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
                    {platformItems.map(({ href, label, icon: Icon, badge, description }) => (
                      <NavigationMenuLink key={href} asChild>
                        <Link
                          href={href}
                          className={cn(
                            "group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                            isActive(href) && "bg-accent text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2 font-medium">
                            <Icon className="h-4 w-4" />
                            {label}
                            {badge && (
                              <Badge 
                                variant={getBadgeVariant(badge)} 
                                className="h-5 px-1.5 text-xs"
                              >
                                {badge}
                              </Badge>
                            )}
                          </div>
                          <div className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            {description}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Account Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Account
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[300px]">
                    {accountItems.map(({ href, label, icon: Icon, description }) => (
                      <NavigationMenuLink key={href} asChild>
                        <Link
                          href={href}
                          className={cn(
                            "group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                            isActive(href) && "bg-accent text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2 font-medium">
                            <Icon className="h-4 w-4" />
                            {label}
                          </div>
                          <div className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            {description}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <div className="relative w-full max-w-md ml-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search agents, workflows..."
              className="pl-10 pr-12 h-9 bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-colors"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden md:flex items-center gap-1">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <Command className="h-2 w-2" />K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Create Agent Button */}
          <Button size="sm" className="hidden md:flex h-9 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Plus className="h-4 w-4 mr-2" />
            Create Agent
          </Button>
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              3
            </Badge>
          </Button>

          {/* Credits Display */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 h-9 bg-muted/50 rounded-lg border">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              {userData?.creditsUsed || 0}/{userData?.creditsTotal || 50}
            </span>
            <span className="text-xs text-muted-foreground">Credits</span>
          </div>

          {/* User Navigation */}
          <div className="flex items-center">
            <UserNav />
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden h-9 w-9 p-0">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Logo />
                </SheetTitle>
                <SheetDescription>
                  Navigate your AI agent workflow
                </SheetDescription>
              </SheetHeader>

              {/* Mobile Search */}
              <div className="mt-6 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10"
                />
              </div>

              {/* Mobile Navigation */}
              <div className="mt-6 space-y-6">
                {/* Platform Section */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Platform
                  </h3>
                  <div className="space-y-1">
                    {platformItems.map(({ href, label, icon: Icon, badge, description }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                          isActive(href) && "bg-accent text-accent-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {label}
                            {badge && (
                              <Badge 
                                variant={getBadgeVariant(badge)} 
                                className="h-5 px-1.5 text-xs"
                              >
                                {badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Account Section */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Account
                  </h3>
                  <div className="space-y-1">
                    {accountItems.map(({ href, label, icon: Icon, description }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                          isActive(href) && "bg-accent text-accent-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <div className="flex-1">
                          {label}
                          <p className="text-xs text-muted-foreground">{description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Credits Display */}
                <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg border">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    {userData?.creditsUsed || 0}/{userData?.creditsTotal || 50}
                  </span>
                  <span className="text-xs text-muted-foreground">Credits</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}