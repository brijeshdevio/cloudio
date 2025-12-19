import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import type { AxiosResponse } from "axios";
import { FileService } from "@/api/file.service";
import type { FileForm } from "@/types/file";
import { errorHandler } from "@/utils";
import { useItemsView, useStarsView } from "./views.queries";

export const useUploadFile = () => {
  const { folder_id } = useParams();
  const { refetchItem, refetchItems } = useItemsView();

  return useMutation({
    mutationKey: ["upload-file"],
    mutationFn: (formData: FileForm) => FileService.upload(formData),
    onSuccess: (data: AxiosResponse["data"]) => {
      toast.success(data.message);
      if (folder_id) {
        refetchItem();
      } else {
        refetchItems();
      }
    },
    onError: errorHandler,
  });
};

export const useGetFile = () => {
  const [query] = useSearchParams();
  const fileId = query.get("file_id");

  return useQuery({
    queryKey: ["get-file", fileId],
    queryFn: () => FileService.getById(fileId!),
    enabled: false,
    refetchOnWindowFocus: false,
  });
};

export const useStarFile = () => {
  return useMutation({
    mutationKey: ["star-file"],
    mutationFn: (id: string) => FileService.star(id),
    onSuccess: (data: AxiosResponse["data"]) => {
      toast.success(data.message);
    },
    onError: errorHandler,
  });
};

export const useUnstarFile = () => {
  const { refetch } = useStarsView();

  return useMutation({
    mutationKey: ["unstar-folder"],
    mutationFn: (id: string) => FileService.unstar(id),
    onSuccess: (data: AxiosResponse["data"]) => {
      toast.success(data.message);
      if (location.pathname === "/starred") refetch();
    },
    onError: errorHandler,
  });
};
