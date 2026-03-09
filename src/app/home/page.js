import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">FormBuilder</div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

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
          <Link href="/signup">
            <Button variant="primary" size="lg">
              Start Building Free
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          Everything you need to build forms
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Dead Simple"
            description="Create forms in minutes with our intuitive drag-and-drop builder. No learning curve."
          />
          <FeatureCard
            title="Share Anywhere"
            description="Get a shareable link instantly. Embed on your site or share on social media."
          />
          <FeatureCard
            title="Track Responses"
            description="View responses in real-time. Export to CSV or integrate with your tools."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to build your first form?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users creating beautiful forms every day.
          </p>
          <Link href="/signup">
            <Button 
              variant="primary" 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Get Started - It is Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>© 2024 FormBuilder. Open Source & Free Forever.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}