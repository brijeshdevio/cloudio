import type { LoginType, SignupType } from "@/types";
import { http } from "./http";

export const AuthService = {
  login: async (formData: LoginType) =>
    (await http.post("/auth/login", formData)).data,

  signup: async (formData: SignupType) =>
    (await http.post("/auth/signup", formData)).data,

  logout: async () => (await http.post("/auth/logout")).data,
};
