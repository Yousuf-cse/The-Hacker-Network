import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import Cookies from "js-cookie";

type ExLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

interface SignupFormData {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    countryCode?: string;
    landmark?: string;
  };
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

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
    user: { id: string; name: string; email: string; _id: string };
  }>(api.post("/auth/login", data));

// ---------------- Connection Request Endpoints ----------------
export const createRequest = (data: {
  from_user_objectId: string;
  to_user_objectId: string;
}) => handleRequest<{ requestId: string }>(api.post("/request", data));

export const acceptRequest = (requestId: string) =>
  handleRequest<{ roomId: string }>(api.put(`/request/accept/${requestId}`));

export const cancelRequest = (requestId: string) =>
  handleRequest<null>(api.put(`/request/cancel/${requestId}`));

// -------------------- User Endpoints --------------------
export const getUserDetails = (id: string) =>
  handleRequest<any>(api.get(`/user/profile/${id}`));

export const findSimilarProfiles = (id: string) =>
  handleRequest<any[]>(api.post("/user/find-similar", { _id: id }));

// -------------------- Room Endpoints --------------------
export const getUserAllRooms = (userId: string) =>
  handleRequest<any>(api.get(`/room?userId=${userId}`));

export const getAllRooms = () =>
  handleRequest<any>(api.get("/room/all-rooms"));

export const createRoom = (data: {
  title: string;
  description: string;
  location: string;
  max_members: number;
  createdBy: string;
  banner?: string;
}) => handleRequest<any>(api.post("/room", data));

// -------------------- Notification Endpoints --------------------
export const getNotifications = (userId: string) =>
  handleRequest<any>(api.get(`/notification/${userId}`));

// -------------------- Request Endpoints --------------------
export const getConnectionRequests = (userId: string) =>
  handleRequest<any>(api.get(`/request?userId=${userId}`));

// -------------------- Chat Endpoints --------------------
export const getRoomMessages = (roomId: string) =>
  handleRequest<any>(api.get(`/chat/${roomId}`));
