import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";
import { FolderService } from "@/api/folder.service";
import { errorHandler } from "@/utils";

export const useCreateFolder = () => {
  return useMutation({
    mutationKey: ["create-folder"],
    mutationFn: (formData: string) => FolderService.create(formData),
    onSuccess: (data: AxiosResponse["data"]) => toast.success(data.message),
    onError: errorHandler,
  });
};
