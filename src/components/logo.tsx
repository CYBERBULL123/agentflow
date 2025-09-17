import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/dashboard"
      className={cn(
        'flex items-center gap-2 text-lg font-semibold text-primary group-data-[state=collapsed]:justify-center',
        className
      )}
      onClick={onClick}
    >
      <div className="p-2 bg-primary text-primary-foreground rounded-lg">
        <Bot className="h-6 w-6" />
      </div>
      <span className="group-data-[state=expanded]:inline group-data-[state=collapsed]:hidden">AgentFlow</span>
    </Link>
  );
}
