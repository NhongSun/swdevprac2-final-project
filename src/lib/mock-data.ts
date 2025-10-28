import type { Booking, Exhibition, User } from "./types";

// Mock users
export const mockUsers: User[] = [
  {
    _id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    role: "member",
  },
  {
    _id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "member",
  },
  {
    _id: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
];

// Mock exhibitions
export const mockExhibitions: Exhibition[] = [
  {
    _id: "ex-1",
    name: "Tech Expo 2025",
    description:
      "The largest technology exhibition in Southeast Asia, featuring cutting-edge innovations and industry leaders.",
    venue: "Bangkok International Trade & Exhibition Centre (BITEC)",
    startDate: "2025-06-15T00:00:00Z",
    durationDay: 3,
    smallBoothQuota: 100,
    bigBoothQuota: 50,
  },
  {
    _id: "ex-2",
    name: "Food & Beverage Fair",
    description:
      "Discover the latest trends in food and beverage industry with over 500 exhibitors.",
    venue: "Queen Sirikit National Convention Center",
    startDate: "2025-07-20T00:00:00Z",
    durationDay: 4,
    smallBoothQuota: 150,
    bigBoothQuota: 75,
  },
  {
    _id: "ex-3",
    name: "Auto Show 2025",
    description: "Experience the future of automotive technology and design.",
    venue: "Impact Exhibition Center",
    startDate: "2025-08-10T00:00:00Z",
    durationDay: 5,
    smallBoothQuota: 80,
    bigBoothQuota: 40,
  },
  {
    _id: "ex-4",
    name: "Fashion Week Bangkok",
    description:
      "Showcase of the latest fashion trends and designer collections.",
    venue: "Central World",
    startDate: "2025-09-05T00:00:00Z",
    durationDay: 7,
    smallBoothQuota: 120,
    bigBoothQuota: 60,
  },
];

// Mock bookings
export const mockBookings: Booking[] = [
  {
    _id: "booking-1",
    user: "user-1",
    exhibition: "ex-1",
    boothType: "small",
    amount: 2,
    createdAt: "2025-05-01T10:00:00Z",
    updatedAt: "2025-05-01T10:00:00Z",
  },
  {
    _id: "booking-2",
    user: "user-1",
    exhibition: "ex-2",
    boothType: "big",
    amount: 1,
    createdAt: "2025-05-02T14:30:00Z",
    updatedAt: "2025-05-02T14:30:00Z",
  },
  {
    _id: "booking-3",
    user: "user-2",
    exhibition: "ex-1",
    boothType: "big",
    amount: 3,
    createdAt: "2025-05-03T09:15:00Z",
    updatedAt: "2025-05-03T09:15:00Z",
  },
];
