import type {
  ApiItemResponse,
  ApiListResponse,
  ApiMessageResponse,
  Booking,
  CreateBookingInput,
  CreateExhibitionFormData,
  Exhibition,
  UpdateBookingInput,
} from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  ? process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "")
  : undefined;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function assertBackendUrl(): string {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not configured");
  }
  return BASE_URL;
}

type RequestOptions = RequestInit & { token?: string };

type ErrorPayload = {
  message?: string;
  error?: string;
};

function extractErrorMessage(payload: unknown): string | undefined {
  if (typeof payload === "object" && payload !== null) {
    const { message, error } = payload as ErrorPayload;
    if (typeof message === "string") return message;
    if (typeof error === "string") return error;
  }
  return undefined;
}

async function request<T>(
  path: string,
  { token, ...options }: RequestOptions = {},
): Promise<T> {
  const backendUrl = assertBackendUrl();
  const url = `${backendUrl}${path}`;

  const headers = new Headers(options.headers ?? {});
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };
  if (!fetchOptions.cache) {
    fetchOptions.cache = "no-store";
  }

  let response: Response;
  try {
    response = await fetch(url, fetchOptions);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to connect to the server";
    throw new ApiError(0, message);
  }

  const text = await response.text();
  let data: unknown;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message =
      extractErrorMessage(data) ||
      `Request failed with status ${response.status}`;
    throw new ApiError(response.status, message);
  }

  return data as T;
}

function resolveEntityId(
  entity: string | { _id: string } | null | undefined,
): string | undefined {
  if (!entity) return undefined;
  return typeof entity === "string" ? entity : entity._id;
}

export const exhibitionApi = {
  async getAll(): Promise<Exhibition[]> {
    const response = await request<ApiListResponse<Exhibition>>("/exhibitions");
    return response.data ?? [];
  },

  async getById(id: string): Promise<Exhibition | null> {
    try {
      const response = await request<ApiItemResponse<Exhibition>>(
        `/exhibitions/${id}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null;
      }
      throw error;
    }
  },

  async create(
    input: CreateExhibitionFormData,
    token: string,
  ): Promise<Exhibition> {
    const response = await request<ApiItemResponse<Exhibition>>(
      "/exhibitions",
      {
        method: "POST",
        body: JSON.stringify(input),
        token,
      },
    );
    return response.data;
  },

  async update(
    id: string,
    input: CreateExhibitionFormData,
    token: string,
  ): Promise<Exhibition> {
    const response = await request<ApiItemResponse<Exhibition>>(
      `/exhibitions/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(input),
        token,
      },
    );
    return response.data;
  },

  async delete(id: string, token: string): Promise<void> {
    await request<ApiMessageResponse>(`/exhibitions/${id}`, {
      method: "DELETE",
      token,
    });
  },
};

export const bookingApi = {
  async getAll(token: string): Promise<Booking[]> {
    const response = await request<ApiListResponse<Booking>>("/booking", {
      token,
    });
    return response.data ?? [];
  },

  async getById(id: string, token: string): Promise<Booking | null> {
    try {
      const response = await request<ApiItemResponse<Booking>>(
        `/booking/${id}`,
        { token },
      );
      return response.data;
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null;
      }
      throw error;
    }
  },

  async create(input: CreateBookingInput, token: string): Promise<Booking> {
    const response = await request<ApiItemResponse<Booking>>("/booking", {
      method: "POST",
      body: JSON.stringify(input),
      token,
    });
    console.log(response);
    return response.data;
  },

  async update(
    id: string,
    input: UpdateBookingInput,
    token: string,
  ): Promise<Booking> {
    const response = await request<ApiItemResponse<Booking>>(`/booking/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
      token,
    });
    return response.data;
  },

  async delete(id: string, token: string): Promise<void> {
    await request<ApiMessageResponse>(`/booking/${id}`, {
      method: "DELETE",
      token,
    });
  },
};

export async function getTotalBookedForUserAndExhibition(
  userId: string,
  exhibitionId: string,
  token: string,
): Promise<number> {
  const bookings = await bookingApi.getAll(token);
  return bookings
    .filter(
      (booking) =>
        resolveEntityId(booking.user) === userId &&
        resolveEntityId(booking.exhibition) === exhibitionId,
    )
    .reduce((total, booking) => total + booking.amount, 0);
}
