import axios, { type AxiosInstance, type AxiosResponse } from "axios";

type ExLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

interface SignupFormData {
  // Step 1: Basic Info
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;

  // Step 2: Address
  address: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    countryCode?: string;
    landmark?: string;
  };

  // Step 3: Education & Skills
  education: {
    college_name: string;
    year_of_study: number;
    department: string;
  };
  skills: {
    technical: string;
    non_technical: string;
  };
  experience_level: ExLevel;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  result: T;
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

async function handleRequest<T>(
  promise: Promise<AxiosResponse<ApiResponse<T>>>
): Promise<ApiResponse<T>> {
  const response = await promise;
  return response.data;
}

// -------------------- Auth Endpoints --------------------
export const signUp = (data: SignupFormData) =>
  handleRequest<{ token: string }>(api.post("/auth/sign-up", data));

export const login = (data: { email: string; password: string }) =>
  handleRequest<{
    token: string;
    user: { id: string; name: string; email: string };
  }>(api.post("/auth/login", data));

// ---------------- Connection Request Endpoints ----------------
export const createRequest = (data: { targetUserId: string }) =>
  handleRequest<{ requestId: string }>(api.post("/request", data));

export const acceptRequest = (requestId: string) =>
  handleRequest<{ roomId: string }>(
    api.put(`/request/accept/${requestId}`)
  );

export const cancelRequest = (requestId: string) =>
  handleRequest<null>(api.put(`/request/cancel/${requestId}`));
