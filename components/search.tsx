"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SearchResult } from "@/lib/types";
import Link from "next/link";

interface SearchProps {
  searchData: SearchResult[];
  className?: string;
}

export function SearchDialog({ searchData, className }: SearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [] as SearchResult[];

    const q = query.toLowerCase();
    const toLower = (v: unknown) => (typeof v === "string" ? v.toLowerCase() : "");

    return searchData
      .filter((item) => {
        const title = toLower(item.title);
        const desc = toLower(item.description);
        const content = toLower(item.content);
        return title.includes(q) || desc.includes(q) || content.includes(q);
      })
      .slice(0, 10);
  }, [query, searchData]);

  useEffect(() => {
    setResults(filteredResults);
  }, [filteredResults]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleResultClick = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64",
            className
          )}
        >
          <Search className="mr-2 h-4 w-4" />
          <span className="hidden lg:inline-flex">Search documentation...</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Documentation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Type to search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {query.trim() && results.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                No results found for &ldquo;{query}&rdquo;
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-2">
                {results.map((result, index) => (
                  <Link
                    key={result.href + index}
                    href={result.href}
                    onClick={handleResultClick}
                    className="block rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <h4 className="text-sm font-medium leading-none">
                          {highlightMatch(result.title, query)}
                        </h4>
                        {result.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {highlightMatch(result.description, query)}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary" className="text-xs">
                            {result.href.split("/").pop() || "page"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {query.trim() && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {results.length} result{results.length !== 1 ? "s" : ""} found
                </span>
                <div className="flex items-center gap-2">
                  <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 flex">
                    ↵
                  </kbd>
                  <span>to select</span>
                  <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 flex">
                    esc
                  </kbd>
                  <span>to close</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function highlightMatch(text: unknown, query: string): React.ReactNode {
  const s = typeof text === "string" ? text : text == null ? "" : String(text);
  if (!query.trim() || !s) return s;

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = s.split(regex);

  return parts.map((part, index) =>
    regex.test(part)
      ? (
          <mark
            key={index}
            className="bg-yellow-200 dark:bg-yellow-900 rounded px-0.5"
          >
            {part}
          </mark>
        )
      : part
  );
}
