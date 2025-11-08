export type Exhibition = {
  _id: string;
  name: string;
  description?: string;
  venue?: string;
  startDate: string; // ISO
  durationDay?: number;
  smallBoothQuota?: number;
  bigBoothQuota?: number;
};

// Booking (aligned with API)
export type Booking = {
  _id: string;
  user: string | { _id: string; name: string; email: string };
  exhibition: string | Exhibition;
  boothType: "small" | "big";
  amount: number;
  createdAt: string;
  updatedAt: string;
};

// User roles
export type UserRole = "admin" | "member";

// User context
export type User = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
};

// Create booking input
export type CreateBookingInput = {
  exhibition: string;
  boothType: "small" | "big";
  amount: number;
};

// Update booking input
export type UpdateBookingInput = {
  boothType: "small" | "big";
  amount: number;
};

export type CreateExhibitionFormData = {
  name: string;
  description: string;
  venue: string;
  startDate: string;
  durationDay: number;
  smallBoothQuota: number;
  bigBoothQuota: number;
  posterPicture: string;
};
