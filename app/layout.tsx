import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import "./globals.css";
import { createClient } from "./lib/supabase/server";
import SignOutButton from "./components/SignOutButton";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Garden",
  description: "Tumblr-esque digital garden built with Next.js and Tailwind CSS for joiebells goonnette stuff.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex flex-col flex-1 items-center justify-center bg-black">
          {/* <h1>{user?.email ?? "Not logged in"}</h1> */}
          <SignOutButton user={user} />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
