"use client";

import { useState } from "react";
import { Menu, Lock } from "lucide-react";
import Link from "next/link";
import { Image } from "@/components/ui/image";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { DocsSidebar } from "@/components/sidebar/docs-sidebar";
import { SearchDialog } from "@/components/search";
import { AnimatedThemeToggler } from "@/components/magic-ui/animated-theme-toggler";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { NavItem, SearchResult } from "@/lib/types";
import { useAuth } from "@/components/password-protection";

interface DocsLayoutProps {
  children: React.ReactNode;
  navigation: NavItem[];
  searchData?: SearchResult[];
}

export function DocsLayout({
  children,
  navigation,
  searchData = [],
}: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { accessLevel, isSuperUser, logout } = useAuth() as any;

  function filterByAccess(items: NavItem[], level: number): NavItem[] {
    const result: NavItem[] = [];
    for (const item of items) {
      const itemAccess = item.access ?? [0];
      const filteredChildren = item.children
        ? filterByAccess(item.children, level)
        : undefined;
      const isSuperOnly = itemAccess.length === 1 && itemAccess[0] === 4;
      const canSee =
        isSuperUser ||
        (!isSuperOnly &&
          (itemAccess.includes(0) || itemAccess.includes(level)));
      if (canSee) {
        if (filteredChildren && filteredChildren.length > 0) {
          result.push({ ...item, children: filteredChildren });
        } else {
          result.push({ ...item, children: undefined });
        }
      } else if (filteredChildren && filteredChildren.length > 0) {
        result.push(...filteredChildren);
      }
    }
    return result;
  }

  const filteredNavigation = filterByAccess(navigation, accessLevel);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center">
          <BlurFade delay={0.1}>
            <div className="mr-4 hidden md:flex">
              <Link href="/docs" className="ml-6 flex items-center space-x-2">
                <Image
                  src="/logo_black.png"
                  alt="FSAE Powertrain Documentation"
                  useNextImage={true}
                  width={120}
                  height={32}
                  className="h-8 w-auto dark:hidden"
                />
                <Image
                  src="/logo_white.png"
                  alt="FSAE Powertrain Documentation"
                  useNextImage={true}
                  width={120}
                  height={32}
                  className="h-8 w-auto hidden dark:block"
                />
                <span className="sr-only">FSAE Powertrain Documentation</span>
              </Link>
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="flex items-center md:hidden">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="ml-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="pr-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Main navigation menu for the documentation site.
                  </SheetDescription>
                  <div className="px-1">
                    <DocsSidebar navigation={filteredNavigation} />
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/docs" className="flex items-center space-x-2">
                <Image
                  src="/logo_black.png"
                  alt="FSAE Powertrain Documentation"
                  width={105}
                  height={28}
                  className="h-7 w-auto dark:hidden"
                />
                <Image
                  src="/logo_white.png"
                  alt="FSAE Powertrain Documentation"
                  width={105}
                  height={28}
                  className="h-7 w-auto hidden dark:block"
                />
                <span className="sr-only">FSAE Powertrain Documentation</span>
              </Link>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="flex flex-1 items-center justify-between md:space-x-8 space-x-4 md:justify-end">
              <div className="w-full flex-1 md:w-auto md:flex-none ml-10">
                <SearchDialog
                  searchData={searchData}
                  className="md:w-[300px] lg:w-[400px] w-[220px] min-w-[200px]"
                />
              </div>
              <div className="hidden md:flex items-center gap-8">
                <AnimatedThemeToggler />
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={logout}
                  aria-label="Change password"
                  className="p-5"
                >
                  <Lock className="!h-3.5 !w-3.5" />
                </Button>
              </div>
            </div>
          </BlurFade>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-3.5rem)]">
        <aside className="hidden md:flex w-64 border-r bg-background/50 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="w-full">
            <BlurFade delay={0.4} className="h-full">
              <div className="h-full py-6 px-4">
                <DocsSidebar navigation={filteredNavigation} />
              </div>
            </BlurFade>
          </div>
        </aside>

        <div className="flex-1 min-w-0 flex">
          <main className="flex-1 min-w-0">
            <div className="container mx-auto px-6 py-8 max-w-4xl">
              {children}
            </div>
          </main>

          <div
            id="toc-sidebar"
            className="hidden lg:block w-64 border-l bg-background/50 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto"
          ></div>
        </div>
      </div>

      {/* <footer className="border-t py-6 md:py-0 w-full flex justify-center">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <BlurFade delay={0.5} inView>
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Documentation For FSAE Powertrain by Brians Tjipto
              </p>
            </div>
          </BlurFade>
        </div>
      </footer> */}
    </div>
  );
}
