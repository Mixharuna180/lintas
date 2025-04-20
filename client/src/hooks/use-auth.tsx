import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { InsertUser, User } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<{ message: string; user: User }, Error, LoginData>;
  logoutMutation: UseMutationResult<{ message: string }, Error, void>;
  registerMutation: UseMutationResult<{ message: string; user: User }, Error, RegisterData>;
};

// Data type for login form
type LoginData = {
  username: string;
  password: string;
};

// Data type for registration form
type RegisterData = Omit<InsertUser, "username" | "password" | "email" | "name"> & {
  username: string;
  password: string;
  email: string;
  name: string;
  confirmPassword: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: (response) => {
      queryClient.setQueryData(["/api/user"], response.user);
      toast({
        title: "Login berhasil",
        description: "Selamat datang di area member LINTAS FIBER.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login gagal",
        description: error.message || "Username atau password salah.",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterData) => {
      const res = await apiRequest("POST", "/api/register", userData);
      return await res.json();
    },
    onSuccess: (response) => {
      queryClient.setQueryData(["/api/user"], response.user);
      toast({
        title: "Registrasi berhasil",
        description: "Akun Anda berhasil dibuat. Selamat datang di LINTAS FIBER!",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registrasi gagal",
        description: error.message || "Terjadi kesalahan saat mendaftar. Silakan coba lagi.",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/logout");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Logout berhasil",
        description: "Anda telah keluar dari akun Anda.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout gagal",
        description: error.message || "Terjadi kesalahan saat logout.",
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}