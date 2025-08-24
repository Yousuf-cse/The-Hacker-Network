import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getUserDetails } from "../services/ApiServices";
import Cookies from "js-cookie";

type AuthContextType = {
  user: any;
  loading: boolean;
  error: string;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshUser = async () => {
    const token = Cookies.get("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await getUserDetails(Cookies.get("_id") as string);
      setUser(res.result.user);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
