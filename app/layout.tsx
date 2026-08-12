import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "BAMNU — The Panda Who Refused to Quit";
const description = "Meet BAMNU, the Solana meme coin built publicly from zero. No fake hype—just one stubborn panda and a growing community.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  return {
    metadataBase: base,
    title,
    description,
    keywords: ["BAMNU", "Solana", "meme coin", "panda", "community"],
    icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
    openGraph: { title, description, type: "website", url: base, images: [{ url: "/og.png", width: 1200, height: 630, alt: "BAMNU — The Panda Who Refused to Quit" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
