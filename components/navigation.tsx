'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PlaneTakeoff, MapPin, User } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <PlaneTakeoff className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Travel Planner
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === '/' ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              Home
            </Link>
            <Link
              href="/explore"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname?.startsWith('/explore')
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
            >
              Explore
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname?.startsWith('/dashboard')
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
            >
              Dashboard
            </Link>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          {/* <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button> */}
        </div>
      </div>
    </header>
  );
}