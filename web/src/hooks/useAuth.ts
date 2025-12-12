import { useMutation } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { toast } from "sonner";
import { login, logout, signup } from "@/services/auth.service";
import { errorHandler } from "@/utils";
import type { LoginType, SignupType } from "@/types";

export function useSignup() {
  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignupType) => await signup(data),
    onSuccess: (data: AxiosResponse["data"]) => {
      toast.success(data.message);
    },
    onError: errorHandler,
  });
  return mutation;
}

export function useLogin() {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginType) => await login(data),
    onSuccess: (data: AxiosResponse["data"]) => {
      window.location.href = "/my-drive";
      toast.success(data.message);
    },
    onError: errorHandler,
  });
  return mutation;
}

export function useLogout() {
  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => await logout(),
    onSuccess: (data: AxiosResponse["data"]) => {
      window.location.href = "/";
      toast.success(data.message);
    },
    onError: errorHandler,
  });
  return mutation;
}
