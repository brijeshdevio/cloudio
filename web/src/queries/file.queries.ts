import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import type { AxiosResponse } from "axios";
import { FileService } from "@/api/file.service";
import type { FileForm, RenameFileForm } from "@/types/file";
import { errorHandler } from "@/utils";
import {
  useItemsView,
  useRecentView,
  useStarsView,
  useTrashView,
} from "./views.queries";

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

export const useRenameFile = () => {
  const { refetchItem, refetchItems } = useItemsView();
  const { folder_id } = useParams();

  return useMutation({
    mutationKey: ["rename-folder"],
    mutationFn: (data: RenameFileForm) =>
      FileService.update(data.id, { newName: data.name }),
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

export const useTrashFile = () => {
  const { refetchItem, refetchItems } = useItemsView();
  const { folder_id } = useParams();

  return useMutation({
    mutationKey: ["trash-file"],
    mutationFn: (id: string) => FileService.trash(id),
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

export const useRestoreFile = () => {
  const { refetch } = useTrashView();

  return useMutation({
    mutationKey: ["restore-file"],
    mutationFn: (id: string) => FileService.restore(id),
    onSuccess: (data: AxiosResponse["data"]) => {
      toast.success(data.message);
      refetch();
    },
    onError: errorHandler,
  });
};

export const useDeleteFile = () => {
  const { folder_id } = useParams();
  const { refetch: refetchTrash } = useTrashView();
  const { refetch: refetchStar } = useStarsView();
  const { refetch: refetchRecent } = useRecentView();
  const { refetchItem, refetchItems } = useItemsView();

  return useMutation({
    mutationKey: ["delete-file"],
    mutationFn: (id: string) => FileService.delete(id),
    onSuccess: (data: AxiosResponse["data"]) => {
      toast.success(data.message);
      if (folder_id) refetchItem();
      if (location.pathname === "/my-drive") refetchItems();
      if (location.pathname === "/starred") refetchStar();
      if (location.pathname === "/trash") refetchTrash();
      if (location.pathname === "/recent") refetchRecent();
    },
    onError: errorHandler,
  });
};
