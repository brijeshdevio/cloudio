import { useMutation } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { toast } from "sonner";
import { errorHandler } from "@/utils";
import type { LoginType, SignupType } from "@/types";
import { AuthService } from "@/api/auth.service";

export function useSignup() {
  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignupType) => await AuthService.signup(data),
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
    mutationFn: async (data: LoginType) => await AuthService.login(data),
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
    mutationFn: async () => await AuthService.logout(),
    onSuccess: (data: AxiosResponse["data"]) => {
      window.location.href = "/";
      toast.success(data.message);
    },
    onError: errorHandler,
  });
  return mutation;
}
