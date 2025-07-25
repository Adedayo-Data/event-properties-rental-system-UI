"use client";

export interface Booking {
  id: number;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
  title: string;
  venue: string;
  date: string;          // human-friendly for demo; ideally use ISO string
  amount: string;        // e.g. "$2,500"; ideally number in real app
  image: string;
  type: string;
  time?: string;
  duration?: string;
  guests?: number;
  bookingId?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  specialRequests?: string;
  amenities?: string[];
}

export interface BookingsData {
  upcoming: Booking[];
  past: Booking[];
  cancelled: Booking[];
}

export type TabId = keyof BookingsData; // 'upcoming' | 'past' | 'cancelled'

export function getStatusColor(status: Booking["status"]): string {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}