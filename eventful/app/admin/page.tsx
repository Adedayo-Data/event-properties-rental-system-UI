"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/app/admin/Sidebar";
import StatsCards from "@/app/admin/Dashboard/StatsCards";
import RecentBookings from "@/app/admin/Dashboard/RecentBookings";
import VenueGrid from "@/app/admin/venue/VenueGrid";
import BookingsTable from "@/app/admin/Bookings/BookingsTable";
import UsersTable from "@/app/admin/Users/UsersTable";
import { Booking, Venue, User } from "@/lib/types";
import { motion, AnimatePresence } from "motion/react";

const sampleBookings: Booking[] = [
  {
    id: 52,
    venue: "Grand Ballroom",
    user: "Sophia Clark",
    userEmail: "sophia@email.com",
    date: "2024-07-15",
    time: "18:00",
    status: "confirmed",
    amount: 2500,
    guests: 250,
    bookingId: "GB-2024-001",
  },
  {
    id: 42,
    venue: "Ocean View Terrace",
    user: "Ethan Bennett",
    userEmail: "ethan@email.com",
    date: "2024-07-20",
    time: "16:00",
    status: "pending",
    amount: 1800,
    guests: 120,
    bookingId: "OVT-2024-002",
  },
];

const sampleUsers: User[] = [
  {
    id: 1,
    name: "Sophia Clark",
    email: "sophia@email.com",
    joinDate: "2024-01-15",
    totalBookings: 3,
    totalSpent: 7500,
    status: "active",
  },
  {
    id: 2,
    name: "Ethan Bennett",
    email: "ethan@email.com",
    joinDate: "2024-02-20",
    totalBookings: 1,
    totalSpent: 1800,
    status: "active",
  },
];

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    // bookings
    case "confirmed":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    // venues
    case "active":
      return "bg-green-100 text-green-700";
    case "inactive":
      return "bg-gray-100 text-gray-700";
    case "maintenance":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const HomePage = () => {
  const [activePage, setActivePage] = useState("dashboard");

  // ⬇️ NEW: live venues state
  const [venues, setVenues] = useState<Venue[]>([]);
  const [venuesLoading, setVenuesLoading] = useState(true);
  const [venuesError, setVenuesError] = useState<string | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);


  useEffect(() => {
    let cancelled = false;

    async function fetchVenues() {
      try {
        setVenuesLoading(true);
        setVenuesError(null);

        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;

        const res = await fetch(`${API_BASE}/api/venues`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        // Normalize API → UI shape safely
        const normalized: Venue[] = (Array.isArray(data) ? data : []).map(
          (v: any) => ({
            id: Number(v.id),
            name: v.name ?? "",
            location: v.location ?? "—",
            image: v.image ?? "/images/Background.jpeg",
            description: v.description ?? "",
            price: Number(v.price ?? 0),
            capacity: Number(v.capacity ?? 0),
            status: v.status ?? "active",
            amenities: Array.isArray(v.amenities) ? v.amenities : [],
          })
        );

        if (!cancelled) setVenues(normalized);
      } catch (err: any) {
        if (!cancelled) setVenuesError(err?.message || "Failed to fetch venues");
      } finally {
        if (!cancelled) setVenuesLoading(false);
      }
    }

    fetchVenues();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
  let cancelled = false;

  async function fetchBookings() {
    try {
      setBookingsLoading(true);
      setBookingsError(null);

      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const res = await fetch(`${API_BASE}/api/bookings`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      // Map backend → UI shape
      const normalized: Booking[] = (Array.isArray(data) ? data : []).map(
        (b: any) => ({
          id: Number(b.id),
          venue: b.venue?.name ?? "—",
          user: b.user?.name ?? "—",
          userEmail: b.user?.email ?? "",
          date: b.date ?? "",
          time: b.time ?? "",
          status: b.status ?? "pending",
          amount: Number(b.amount ?? 0),
          guests: Number(b.guests ?? 0),
          bookingId: b.bookingId ?? "",
        })
      );

      if (!cancelled) setBookings(normalized);
    } catch (err: any) {
      if (!cancelled) setBookingsError(err?.message || "Failed to fetch bookings");
    } finally {
      if (!cancelled) setBookingsLoading(false);
    }
  }

  fetchBookings();
  return () => {
    cancelled = true;
  };
}, []);


  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 },
  };

  const pageTransition = { duration: 0.4 };

  const getPageTitle = (page: string) => {
    switch (page) {
      case "dashboard":
        return "Dashboard Overview";
      case "venues":
        return "Venue Management";
      case "bookings":
        return "Booking Management";
      case "users":
        return "User Management";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <motion.main
        className="ml-64 p-6 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Page Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-2"
            key={activePage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {getPageTitle(activePage)}
          </motion.h1>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Welcome back! Here's what's happening with your events today.
          </motion.p>
        </motion.div>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {activePage === "dashboard" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <StatsCards
                  stats={[
                    { label: "Total Bookings", value: 128, change: "+5.2%", color: "green" },
                    { label: "Revenue", value: "$12,500", change: "+3.8%", color: "green" },
                    { label: "Active Venues", value: 18, change: "+1.1%", color: "green" },
                    { label: "New Users", value: 42, change: "+4.5%", color: "green" },
                  ]}
                />
                <RecentBookings bookings={bookings} getStatusColor={getStatusColor} />
              </motion.div>
            )}

            {activePage === "venues" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {venuesLoading && <div className="text-gray-600">Loading venues…</div>}
                {!venuesLoading && venuesError && (
                  <div className="text-red-600">Error: {venuesError}</div>
                )}
                {!venuesLoading && !venuesError && (
                  <VenueGrid venues={venues} getStatusColor={getStatusColor} />
                )}
              </motion.div>
            )}

            {activePage === "bookings" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <BookingsTable bookings={bookings} getStatusColor={getStatusColor} />
              </motion.div>
            )}

            {activePage === "users" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <UsersTable users={sampleUsers} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default HomePage;
