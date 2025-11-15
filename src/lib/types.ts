export type UserRole = "admin" | "member";

export type User = {
  _id: string;
  name: string;
  email: string;
  tel?: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
};

export type Exhibition = {
  _id: string;
  name: string;
  description?: string;
  venue?: string;
  startDate: string;
  durationDay?: number;
  smallBoothQuota?: number;
  bigBoothQuota?: number;
  posterPicture?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BookingUser = {
  _id: string;
  name: string;
  email: string;
  tel?: string;
  role?: UserRole;
};

export type BookingExhibition = {
  _id: string;
  name: string;
  description?: string;
  venue?: string;
  startDate: string;
  durationDay?: number;
  smallBoothQuota?: number;
  bigBoothQuota?: number;
  posterPicture?: string;
};

export type Booking = {
  _id: string;
  user: string | BookingUser;
  exhibition: string | BookingExhibition;
  boothType: "small" | "big";
  amount: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateBookingInput = {
  exhibition: string;
  boothType: "small" | "big";
  amount: number | string;
};

// Update booking input
export type UpdateBookingInput = {
  boothType: "small" | "big";
  amount: number | string;
};

export type ApiListResponse<T> = {
  success: true;
  count: number;
  data: T[];
  message?: string;
};

export type ApiItemResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ApiMessageResponse = {
  success: boolean;
  message?: string;
};

export type ApiErrorResponse = {
  success: false;
  message?: string;
  error?: string;
};

export type CreateExhibitionFormData = {
  name: string;
  description: string;
  venue: string;
  startDate: string;
  durationDay: number | string;
  smallBoothQuota: number | string;
  bigBoothQuota: number | string;
  posterPicture: string;
};
