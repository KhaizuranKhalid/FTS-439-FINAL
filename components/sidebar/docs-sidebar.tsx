"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, FileText, Folder, FolderOpen, Lock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { TableOfContents } from "./table-of-contents";
import { AnimatedThemeToggler } from "@/components/magic-ui/animated-theme-toggler";
import { useAuth } from "@/components/password-protection";

interface DocsSidebarProps {
  navigation: NavItem[];
  className?: string;
  content?: string;
}

interface NavItemComponentProps {
  item: NavItem;
  pathname: string;
  level?: number;
}

function NavItemComponent({
  item,
  pathname,
  level = 0,
}: NavItemComponentProps) {
  const [isOpen, setIsOpen] = useState(() => {
    if (item.children) {
      return item.children.some(
        (child) =>
          pathname === child.href ||
          (child.children && isItemActive(child, pathname))
      );
    }
    return false;
  });

  const isActive = pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;

  function isItemActive(navItem: NavItem, currentPath: string): boolean {
    if (navItem.href === currentPath) return true;
    if (navItem.children) {
      return navItem.children.some((child) => isItemActive(child, currentPath));
    }
    return false;
  }

  const handleFolderClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-chevron]")) {
      e.preventDefault();
      setIsOpen(!isOpen);
      return;
    }
  };

  return (
    <div>
      {hasChildren ? (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center">
            <Link href={item.href} className="flex-1">
              <Button
                variant="ghost"
                className={cn(
                  "w-fit justify-start h-auto p-2 text-left font-normal",
                  isActive && "bg-muted font-medium"
                )}
                onClick={handleFolderClick}
                style={{ marginLeft: level > 0 ? level * 12 : 0 }}
              >
                <div className="flex items-center gap-2 flex-1">
                  {isOpen ? (
                    <FolderOpen className="h-4 w-4 shrink-0" />
                  ) : (
                    <Folder className="h-4 w-4 shrink-0" />
                  )}
                  <span className="flex-1 text-sm">{item.title}</span>
                </div>
              </Button>
            </Link>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-8 p-0 shrink-0"
                data-chevron
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isOpen && "rotate-90"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="space-y-1">
              {item.children
                ?.sort((a, b) => {
                  const aOrder = a.order ?? Infinity;
                  const bOrder = b.order ?? Infinity;

                  if (aOrder !== bOrder) {
                    return aOrder - bOrder;
                  }

                  const aIsFolder = a.children && a.children.length > 0;
                  const bIsFolder = b.children && b.children.length > 0;

                  if (aIsFolder && !bIsFolder) return -1;
                  if (!aIsFolder && bIsFolder) return 1;

                  return a.title.localeCompare(b.title);
                })
                .map((child) => (
                  <NavItemComponent
                    key={child.href}
                    item={child}
                    pathname={pathname}
                    level={level + 1}
                  />
                ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Link href={item.href}>
          <Button
            variant="ghost"
            className={cn(
              "w-fit justify-start h-auto p-2 text-left font-normal",
              isActive && "bg-muted font-medium"
            )}
            style={{ marginLeft: level > 0 ? level * 12 : 0 }}
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 shrink-0" />
              <span className="text-sm">{item.title}</span>
            </div>
          </Button>
        </Link>
      )}
    </div>
  );
}

export function DocsSidebar({
  navigation,
  className,
  content,
}: DocsSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div
      className={cn("w-full h-full flex flex-col px-4 min-h-[80vh] w-96 overflow-x-auto", className)}
    >
      <div className="flex-1 min-h-0">
        <div className="pb-4">
          <h2 className="mb-4 text-lg font-semibold md:mt-0 mt-6">
            Documentation
          </h2>
          <ScrollArea className="h-[calc(90vh-4rem)]">
            <div className="space-y-1 pr-4">
              {navigation.map((item) => (
                <NavItemComponent
                  key={item.href}
                  item={item}
                  pathname={pathname}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {content && (
        <>
          <Separator className="my-4" />

          <div className="flex-1 min-h-0">
            <TableOfContents content={content} />
          </div>
        </>
      )}

      <div className="mt-auto pt-4 block md:hidden">
        <div className="flex items-center justify-between pr-2">
          <AnimatedThemeToggler />
          <Button
            variant="secondary"
            size="icon"
            aria-label="Change password"
            className="p-5"
            onClick={logout}
          >
            <Lock className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
