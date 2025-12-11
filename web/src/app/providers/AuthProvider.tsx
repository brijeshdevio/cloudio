import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getProfile } from "@/services/user.service";
import type { AuthContextType, UserType } from "@/types";

const initialState: AuthContextType = {
  user: null,
  loading: false,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType>(initialState);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const loadProfile = async function () {
      try {
        const response = await getProfile();
        if (response?.user) {
          setUser(response.user);
          setIsAuthenticated(true);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const value = { user, loading, isAuthenticated };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useModal must be used within a AuthProvider");
  }
  return context;
};
