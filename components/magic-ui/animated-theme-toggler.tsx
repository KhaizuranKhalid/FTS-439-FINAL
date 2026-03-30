'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MoonIcon, SunIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedThemeTogglerProps {
  className?: string;
}

export function AnimatedThemeToggler({ className }: AnimatedThemeTogglerProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn('h-8 w-8 rounded-md bg-muted animate-pulse', className)} />
    );
  }

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200',
        'bg-muted hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <motion.div
        className="absolute inset-0.5 flex items-center justify-center rounded-full bg-background shadow-sm"
        animate={{
          x: isDark ? '100%' : '0%',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
        style={{
          width: '50%',
        }}
      >
        <motion.div
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? 180 : 0,
          }}
          transition={{
            duration: 0.2,
            delay: isDark ? 0 : 0.1,
          }}
          className="absolute"
        >
          <SunIcon className="h-3 w-3 text-yellow-500" />
        </motion.div>
        
        <motion.div
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : -180,
          }}
          transition={{
            duration: 0.2,
            delay: isDark ? 0.1 : 0,
          }}
          className="absolute"
        >
          <MoonIcon className="h-3 w-3 text-blue-400" />
        </motion.div>
      </motion.div>
    </button>
  );
}