import type { LoginType, SignupType } from "@/types";
import { axiosClient } from "./axiosClient";

export const signup = async (data: SignupType) =>
  (await axiosClient.post("/auth/signup", data)).data;

export const login = async (data: LoginType) =>
  (await axiosClient.post("/auth/login", data)).data;

export const logout = async () => (await axiosClient.post("/auth/logout")).data;
