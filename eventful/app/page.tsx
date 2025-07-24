import Image from "next/image";
import FeaturedVenues from "@/components/FeaturedVenues";
import HowItWorks from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gray">
      {/* Hero Section */}
      <section className="w-full bg-green-200 py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
          {/* Left: Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gold mb-4">
              Find the Perfect Venue for Your Event
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-xl">
              Discover and book top event centers for weddings, parties,
              conferences, and more.
            </p>
            <Button className="text-xl px-6 py-4">
              <Link href="/venues">See More</Link>
            </Button>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/Background.jpeg"
                alt="Eventful background"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto py-16 px-4">
        <FeaturedVenues />
        <HowItWorks />
      </section>
    </main>
  );
}
