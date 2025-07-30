"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section 
      className="mb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2 
        className="text-3xl font-display font-bold text-primary mb-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Featured Venues
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {venues.map((venue, index) => (
          <motion.div
            key={venue.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-400"
            variants={cardVariants}
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="relative h-40 w-full overflow-hidden"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={venue.image}
                alt={venue.name}
                fill
                className="object-cover"
              />
            </motion.div>
            
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <motion.h3 
                  className="text-xl font-bold text-black mb-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {venue.name}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 text-sm mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {venue.location}
                </motion.p>
                <motion.p 
                  className="text-primary font-semibold mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {venue.price}
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Button className="mt-auto px-4 py-2 rounded-xl bg-black text-white font-semibold hover:bg-accent hover:text-primary transition-colors w-full">
                  Book Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default FeaturedVenues;
