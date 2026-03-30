import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { PasswordProtection } from "@/components/password-protection";
import { ImageProvider } from "@/components/image-provider";
import "./globals.css";
import "katex/dist/katex.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Open Sans",
    "Helvetica Neue",
    "sans-serif",
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "SF Mono",
    "Consolas",
    "Liberation Mono",
    "Menlo",
    "Monaco",
    "Courier New",
    "monospace",
  ],
});

export const metadata: Metadata = {
  title: "FSAE Powertrain Documentation",
  description: "Documentation for FSAE powertrain systems",
  icons: {
    icon: "/fsae-powertrain/icon_black.png",
    apple: "/fsae-powertrain/icon_black.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const passwordConfig = {
    isEnabled: true,
    promptTitle: "FSAE Documentation Template Access",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ImageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PasswordProtection
              isEnabled={passwordConfig.isEnabled}
              promptTitle={passwordConfig.promptTitle}
            >
              {children}
            </PasswordProtection>
          </ThemeProvider>
        </ImageProvider>
      </body>
    </html>
  );
}
