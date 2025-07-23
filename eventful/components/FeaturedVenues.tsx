import Image from "next/image";
import { Button } from "@/components/ui/button";

const venues = [
  {
    id: 1,
    name: "Grand Palace Hall",
    location: "Ikeja, Lagos",
    price: "₦500,000/night",
    image: "/images/Background.jpeg",
  },
  {
    id: 2,
    name: "Emerald Event Center",
    location: "Victoria Island, Lagos",
    price: "₦750,000/night",
    image: "/images/Background.jpeg",
  },
  {
    id: 3,
    name: "Rosewood Banquet",
    location: "Abuja",
    price: "₦600,000/night",
    image: "/images/Background.jpeg",
  },
  {
    id: 4,
    name: "Gold Crest Pavilion",
    location: "Port Harcourt",
    price: "₦400,000/night",
    image: "/images/Background.jpeg",
  },
];

const FeaturedVenues = () => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-display font-bold text-primary mb-6 text-center">
        Featured Venues
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border"
          >
            <div className="relative h-40 w-full">
              <Image
                src={venue.image}
                alt={venue.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-accent mb-1">
                  {venue.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{venue.location}</p>
                <p className="text-primary font-semibold mb-4">{venue.price}</p>
              </div>
              <Button className="mt-auto px-4 py-2 rounded-xl bg-primary text-white font-semibold hover:bg-accent hover:text-primary transition-colors">
                Book Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedVenues;
