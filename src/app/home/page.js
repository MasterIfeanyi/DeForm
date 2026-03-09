import Button from '@/components/ui/Button';
import Link from 'next/link';
import Navbar from '../_components/Navbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Create Forms in Seconds.<br />
          <span className="text-blue-600">Share Instantly.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Build beautiful forms, collect responses, and analyze results. 
          No coding required. Open source and free forever.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/builder">
            <Button variant="primary" size="large">
              Start Building Free
            </Button>
          </Link>
          <Link href="">
            <Button variant="outline" size="large">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2026 DeForm. Open Source & Free Forever.</p>
        </div>
      </footer>
    </div>
  );
}

