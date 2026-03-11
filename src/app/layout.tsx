import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://numifi.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Numifi — AI-Powered Financial Document Converter",
    template: "%s | Numifi",
  },
  description:
    "Convert bank statements, invoices, receipts, and tax forms to Excel in seconds. AI-powered extraction, automatic categorization, and a financial chatbot.",
  keywords: [
    "bank statement to excel",
    "PDF to Excel converter",
    "financial document converter",
    "AI document extraction",
    "bank statement converter",
    "invoice to spreadsheet",
    "receipt scanner",
    "financial data automation",
  ],
  authors: [{ name: "Numifi" }],
  creator: "Numifi",
  publisher: "Numifi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Numifi",
    title: "Numifi — AI-Powered Financial Document Converter",
    description:
      "Convert bank statements, invoices, receipts, and tax forms to Excel in seconds. Then chat with your data using AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Numifi — AI-Powered Financial Document Converter",
    description:
      "Convert bank statements, invoices, receipts, and tax forms to Excel in seconds. Then chat with your data using AI.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  if (mode === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
