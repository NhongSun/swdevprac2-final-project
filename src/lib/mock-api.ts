import { mockBookings, mockExhibitions, mockUsers } from "./mock-data";
import type {
  Booking,
  CreateBookingInput,
  Exhibition,
  UpdateBookingInput,
} from "./types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory storage
const exhibitions = [...mockExhibitions];
let bookings = [...mockBookings];
const users = [...mockUsers];

// Exhibition API
export const exhibitionApi = {
  async getAll(): Promise<Exhibition[]> {
    await delay(300);
    return exhibitions;
  },

  async getById(id: string): Promise<Exhibition | null> {
    await delay(200);
    return exhibitions.find((ex) => ex._id === id) || null;
  },
};

// Booking API
export const bookingApi = {
  async getAll(userId?: string, role?: "admin" | "member"): Promise<Booking[]> {
    await delay(300);

    // Admin sees all bookings
    if (role === "admin") {
      // Populate user and exhibition data
      return bookings.map((booking) => ({
        ...booking,
        user: users.find((u) => u._id === booking.user) || booking.user,
        exhibition:
          exhibitions.find((ex) => ex._id === booking.exhibition) ||
          booking.exhibition,
      }));
    }

    // Member sees only their bookings
    const userBookings = bookings.filter((b) => b.user === userId);
    return userBookings.map((booking) => ({
      ...booking,
      user: users.find((u) => u._id === booking.user) || booking.user,
      exhibition:
        exhibitions.find((ex) => ex._id === booking.exhibition) ||
        booking.exhibition,
    }));
  },

  async getById(id: string): Promise<Booking | null> {
    await delay(200);
    const booking = bookings.find((b) => b._id === id);
    if (!booking) return null;

    return {
      ...booking,
      user: users.find((u) => u._id === booking.user) || booking.user,
      exhibition:
        exhibitions.find((ex) => ex._id === booking.exhibition) ||
        booking.exhibition,
    };
  },

  async create(input: CreateBookingInput, userId: string): Promise<Booking> {
    await delay(400);

    // Validate exhibition exists
    const exhibition = exhibitions.find((ex) => ex._id === input.exhibition);
    if (!exhibition) {
      throw new Error("Exhibition not found");
    }

    // Check total bookings for this user and exhibition
    const userExhibitionBookings = bookings.filter(
      (b) => b.user === userId && b.exhibition === input.exhibition,
    );
    const totalBooked = userExhibitionBookings.reduce(
      (sum, b) => sum + b.amount,
      0,
    );

    if (totalBooked + input.amount > 6) {
      throw new Error("Quota exceeded or total per user > 6");
    }

    const newBooking: Booking = {
      _id: `booking-${Date.now()}`,
      user: userId,
      exhibition: input.exhibition,
      boothType: input.boothType,
      amount: input.amount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    bookings.push(newBooking);

    return {
      ...newBooking,
      user: users.find((u) => u._id === userId) || userId,
      exhibition: exhibition,
    };
  },

  async update(
    id: string,
    input: UpdateBookingInput,
    userId: string,
    role: "admin" | "member",
  ): Promise<Booking> {
    await delay(400);

    const bookingIndex = bookings.findIndex((b) => b._id === id);
    if (bookingIndex === -1) {
      throw new Error("Booking not found");
    }

    const booking = bookings[bookingIndex];

    // Check permissions
    if (role === "member" && booking.user !== userId) {
      throw new Error("Not authorized");
    }

    // Check total bookings for this user and exhibition (excluding current booking)
    const userExhibitionBookings = bookings.filter(
      (b) =>
        b.user === booking.user &&
        b.exhibition === booking.exhibition &&
        b._id !== id,
    );
    const totalBooked = userExhibitionBookings.reduce(
      (sum, b) => sum + b.amount,
      0,
    );

    if (totalBooked + input.amount > 6) {
      throw new Error("Quota exceeded or total per user > 6");
    }

    const updatedBooking: Booking = {
      ...booking,
      boothType: input.boothType,
      amount: input.amount,
      updatedAt: new Date().toISOString(),
    };

    bookings[bookingIndex] = updatedBooking;

    const user = users.find((u) => u._id === updatedBooking.user);
    const exhibition = exhibitions.find(
      (ex) => ex._id === updatedBooking.exhibition,
    );

    return {
      ...updatedBooking,
      user: user || updatedBooking.user,
      exhibition: exhibition || updatedBooking.exhibition,
    };
  },

  async delete(
    id: string,
    userId: string,
    role: "admin" | "member",
  ): Promise<void> {
    await delay(300);

    const booking = bookings.find((b) => b._id === id);
    if (!booking) {
      throw new Error("Booking not found");
    }

    // Check permissions
    if (role === "member" && booking.user !== userId) {
      throw new Error("Not authorized");
    }

    bookings = bookings.filter((b) => b._id !== id);
  },
};

// Helper function to get total booked for user and exhibition
export async function getTotalBookedForUserAndExhibition(
  userId: string,
  exhibitionId: string,
): Promise<number> {
  const userExhibitionBookings = bookings.filter(
    (b) => b.user === userId && b.exhibition === exhibitionId,
  );
  return userExhibitionBookings.reduce((sum, b) => sum + b.amount, 0);
}
