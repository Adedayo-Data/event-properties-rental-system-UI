export interface Booking {
  id: string;
  venue: string;
  user: string;
  date: string;
  status: string;
  userEmail: string;
  time: string;
  amount: number;
  guests: number;
  bookingId: string;
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  price: number;
  capacity: number;
  status: string;
  amenities: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  totalBookings: number;
  totalSpent: number;
  status: string;
}
