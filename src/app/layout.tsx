import type { Metadata } from "next";
import Link from "next/link";
import PlaceholderBanner from "@/components/PlaceholderBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Fitness Gear Directory",
    template: "%s · Fitness Gear Directory",
  },
  description:
    "Browse athletes, lifters and fitness figures and the gear and supplements associated with each — every claim sourced, every link labelled.",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/profiles", label: "Profiles" },
  { href: "/articles", label: "Articles" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <PlaceholderBanner />

        <header className="bg-ink text-paper">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Fitness<span className="text-gold">Gear</span>
            </Link>
            <nav className="flex gap-6 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-paper/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-16 bg-ink text-paper/60">
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm">
            <p className="font-semibold text-paper">Fitness Gear Directory</p>
            <p className="mt-1 max-w-xl">
              A demo directory of fictional fitness figures and the gear they
              &ldquo;use.&rdquo; All data is placeholder content for layout
              purposes only.
            </p>
            <p className="mt-4 text-xs text-paper/40">
              Links may be affiliate links. Nothing here is medical or health
              advice.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
