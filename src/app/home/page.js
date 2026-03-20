"use client"

import Button from '@/components/ui/Button';
import Link from 'next/link';
import Navbar from '../_components/Navbar';
import { useTranslation } from "@/hooks/useTranslation"

export default function LandingPage() {

  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          {t("auth.landing.hero.title")}<br />
          <span className="text-blue-600">{t("landing.hero.titleHighlight")}</span>
          {/* <span className="text-blue-600">silly wings</span> */}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t("auth.landing.hero.description")}
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/builder">
            <Button variant="primary" size="large">
              {t("auth.landing.hero.ctaPrimary")}
            </Button>
          </Link>
          <Link href="">
            <Button variant="outline" size="large">
              {t("auth.landing.hero.ctaSecondary")}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>{t("auth.landing.footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
}

