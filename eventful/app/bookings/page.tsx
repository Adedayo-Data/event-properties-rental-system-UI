"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import type {
  Booking,
  BookingsData,
  TabId,
} from "@/components/bookings/booking-types";
import { BookingCard } from "@/components/bookings/booking-card";
import { BookingDetailsModal } from "@/components/bookings/booking-details-modal";
import { BookingSupportModal } from "@/components/bookings/booking-support-modal";

// ---- Sample data (replace w/ real fetch) ----
const sampleData: BookingsData = {
  upcoming: [
    {
      id: 1,
      status: "Pending",
      title: "Tech Conference",
      venue: "The Grand Hall",
      date: "July 15, 2024",
      time: "9:00 AM - 6:00 PM",
      duration: "9 hours",
      guests: 250,
      amount: "$2,500",
      image: "/images/Background.jpeg",
      type: "Conference",
      bookingId: "TC-2024-001",
      contactPerson: "John Smith",
      phone: "+1 (555) 123-4567",
      email: "john.smith@techconf.com",
      specialRequests:
        "Need AV equipment, stage setup, and catering for 250 people",
      amenities: [
        "WiFi",
        "AV Equipment",
        "Stage",
        "Parking",
        "Catering Kitchen",
      ],
    },
    {
      id: 2,
      status: "Confirmed",
      title: "Corporate Retreat",
      venue: "Lakeside Resort",
      date: "August 22, 2024",
      time: "10:00 AM - 4:00 PM",
      duration: "6 hours",
      guests: 50,
      amount: "$4,000",
      image: "/images/Background.jpeg",
      type: "Corporate",
      bookingId: "CR-2024-002",
      contactPerson: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      email: "sarah.j@company.com",
      specialRequests: "Team building activities, lunch, and meeting rooms",
      amenities: [
        "Lake View",
        "Meeting Rooms",
        "Outdoor Space",
        "Catering",
        "WiFi",
      ],
    },
    {
      id: 3,
      status: "Pending",
      title: "Product Launch Event",
      venue: "The Loft",
      date: "September 5, 2024",
      time: "7:00 PM - 11:00 PM",
      duration: "4 hours",
      guests: 100,
      amount: "$3,000",
      image: "/images/Background.jpeg",
      type: "Launch",
      bookingId: "PL-2024-003",
      contactPerson: "Mike Davis",
      phone: "+1 (555) 456-7890",
      email: "mike.davis@startup.com",
      specialRequests: "Modern setup, cocktail service, presentation area",
      amenities: [
        "Modern Decor",
        "Bar Service",
        "Presentation Screen",
        "Sound System",
        "Lighting",
      ],
    },
  ],
  past: [
    {
      id: 4,
      status: "Completed",
      title: "Wedding Reception",
      venue: "Garden Pavilion",
      date: "June 10, 2024",
      time: "6:00 PM - 12:00 AM",
      duration: "6 hours",
      guests: 150,
      amount: "$5,500",
      image: "/images/Background.jpeg",
      type: "Wedding",
      bookingId: "WR-2024-004",
      contactPerson: "Emily Brown",
      phone: "+1 (555) 321-9876",
      email: "emily.brown@email.com",
      specialRequests: "Garden setup, floral arrangements, dance floor",
      amenities: [
        "Garden View",
        "Dance Floor",
        "Bridal Suite",
        "Catering",
        "Photography Area",
      ],
    },
  ],
  cancelled: [
    {
      id: 5,
      status: "Cancelled",
      title: "Birthday Party",
      venue: "Rooftop Lounge",
      date: "July 1, 2024",
      time: "8:00 PM - 12:00 AM",
      duration: "4 hours",
      guests: 30,
      amount: "$1,200",
      image: "/images/Background.jpeg",
      type: "Party",
      bookingId: "BP-2024-005",
      contactPerson: "Alex Wilson",
      phone: "+1 (555) 654-3210",
      email: "alex.wilson@email.com",
      specialRequests: "Rooftop setup, birthday decorations, music system",
      amenities: [
        "Rooftop View",
        "Sound System",
        "Bar Access",
        "City View",
        "Lighting",
      ],
    },
  ],
};

export default function BookingsPage() {
  const [activeTab, setActiveTab] = React.useState<TabId>("upcoming");
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(
    null
  );
  const [showDetails, setShowDetails] = React.useState(false);
  const [showSupport, setShowSupport] = React.useState(false);
  const [supportForm, setSupportForm] = React.useState({
    subject: "",
    message: "",
    priority: "medium" as const,
  });

  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: "upcoming", label: "Upcoming", count: sampleData.upcoming.length },
    { id: "past", label: "Past", count: sampleData.past.length },
    { id: "cancelled", label: "Cancelled", count: sampleData.cancelled.length },
  ];

  const handleViewDetails = (b: Booking) => {
    setSelectedBooking(b);
    setShowDetails(true);
  };

  const handleContactSupport = (b: Booking) => {
    setSelectedBooking(b);
    setShowSupport(true);
  };

  const handleSupportSubmit = () => {
    console.log("Support request:", {
      booking: selectedBooking,
      form: supportForm,
    });
    setShowSupport(false);
    setSupportForm({ subject: "", message: "", priority: "medium" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your event center reservations</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* List */}
        <div className="space-y-6">
          {sampleData[activeTab].length === 0 ? (
            <EmptyState activeTab={activeTab} />
          ) : (
            sampleData[activeTab].map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                onView={handleViewDetails}
                onContact={handleContactSupport}
              />
            ))
          )}
        </div>
      </div>

      {/* Details Modal */}
      <BookingDetailsModal
        open={showDetails}
        booking={selectedBooking}
        onClose={() => setShowDetails(false)}
        onContact={(b) => {
          setShowDetails(false);
          handleContactSupport(b);
        }}
      />

      {/* Support Modal */}
      <BookingSupportModal
        open={showSupport}
        booking={selectedBooking}
        form={supportForm}
        onChange={setSupportForm}
        onSubmit={handleSupportSubmit}
        onClose={() => setShowSupport(false)}
      />
    </div>
  );
}

function EmptyState({ activeTab }: { activeTab: TabId }) {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <CalendarIcon size={48} className="mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No bookings found
      </h3>
      <p className="text-gray-500">
        You don't have any {activeTab} bookings at the moment.
      </p>
    </div>
  );
}
