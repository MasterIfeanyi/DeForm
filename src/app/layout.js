import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from './_components/SessionProvider'
import { getServerSession } from "next-auth";
import { I18nProvider } from "@/i18n/I18nProvider"
import QueryProvider from './_components/QueryProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DeForm",
  description: "Open-source Form generator",
};

export default async function RootLayout({ children }) {

  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <SessionProvider>
            <QueryProvider>
              {children}
            </QueryProvider>
          </SessionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
