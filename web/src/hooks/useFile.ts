import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";
import { uploadFile } from "@/services/file.service";
import { errorHandler } from "@/utils";
import type { UploadFileType } from "@/types";

export function useFile() {
  const uploadFileMutation = useMutation({
    mutationKey: ["upload-file"],
    mutationFn: async (data: UploadFileType) => await uploadFile(data),
    onSuccess: (res: AxiosResponse["data"]) => toast.success(res.message),
    onError: errorHandler,
  });

  return { uploadFileMutation };
}
