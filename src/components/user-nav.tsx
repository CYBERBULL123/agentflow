
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  CreditCard, 
  LifeBuoy, 
  LogOut, 
  Settings, 
  User, 
  Crown, 
  Zap,
  Moon,
  Sun,
  Monitor,
  Bell,
  Gift
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function UserNav() {
  const { user, userData, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getPlanBadge = () => {
    const plan = userData?.plan || 'free';
    switch (plan) {
      case 'pro':
        return <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"><Crown className="w-3 h-3 mr-1" />Pro</Badge>;
      case 'enterprise':
        return <Badge variant="default" className="bg-gradient-to-r from-orange-500 to-red-500 text-white"><Zap className="w-3 h-3 mr-1" />Enterprise</Badge>;
      default:
        return <Badge variant="secondary">Free</Badge>;
    }
  };

  const getUsageProgress = () => {
    const used = userData?.creditsUsed || 0;
    const total = userData?.creditsTotal || 50;
    return (used / total) * 100;
  };
  
  if (!user) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Usage Stats */}
      <div className="px-3 py-2 bg-muted/50 rounded-lg mx-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium">Credits</span>
          <span className="text-xs text-muted-foreground">
            {userData?.creditsUsed || 0}/{userData?.creditsTotal || 50}
          </span>
        </div>
        <Progress 
          value={getUsageProgress()} 
          className="h-1.5"
        />
      </div>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative w-full justify-start p-2 h-auto hover:bg-accent mx-2"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user.photoURL ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`}
                    alt={user.displayName ?? 'User'}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                    {getInitials(user.displayName)}
                  </AvatarFallback>
                </Avatar>
                {/* Online indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">
                    {user.displayName ?? 'Anonymous'}
                  </p>
                  {getPlanBadge()}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium leading-none">
                  {user.displayName ?? 'Anonymous'}
                </p>
                {getPlanBadge()}
              </div>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
              {/* Quick stats */}
              <div className="flex items-center gap-4 pt-2">
                <div className="text-center">
                  <p className="text-xs font-medium">{userData?.creditsUsed || 0}</p>
                  <p className="text-xs text-muted-foreground">Used</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium">{userData?.creditsTotal || 50}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium">{userData?.agentsCreated || 0}</p>
                  <p className="text-xs text-muted-foreground">Agents</p>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/billing">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <Badge variant="outline" className="ml-auto text-xs">
                  {userData?.plan || 'Free'}
                </Badge>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          
          {/* Theme Toggle */}
          {mounted && (
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
                {theme === 'light' && <div className="ml-auto h-2 w-2 bg-primary rounded-full" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
                {theme === 'dark' && <div className="ml-auto h-2 w-2 bg-primary rounded-full" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Monitor className="mr-2 h-4 w-4" />
                <span>System</span>
                {theme === 'system' && <div className="ml-auto h-2 w-2 bg-primary rounded-full" />}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
              <Badge variant="destructive" className="ml-auto h-5 w-5 p-0 text-xs">
                3
              </Badge>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Gift className="mr-2 h-4 w-4" />
              <span>Refer Friends</span>
              <Badge variant="secondary" className="ml-auto text-xs">
                +10 Credits
              </Badge>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={signOut} className="text-red-600 focus:text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
