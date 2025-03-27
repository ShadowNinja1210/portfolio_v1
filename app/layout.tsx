import { ThemeProvider } from "./provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsappFloater from "@/components/whatsapp-floater";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mohit Jeswani",
  description: "Portfolio of Mohit Jeswani",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <WhatsappFloater />
          {children}
          <GoogleAnalytics gaId="G-WET32GENYB" />
        </ThemeProvider>
      </body>
    </html>
  );
}
