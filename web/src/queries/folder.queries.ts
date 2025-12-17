import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";
import { FolderService } from "@/api/folder.service";
import { errorHandler } from "@/utils";
import { useItemsView } from "./views.queries";
import { useParams } from "react-router-dom";
import type { FolderForm, RenameFolderForm } from "@/types/folder";

export const useCreateFolder = () => {
  const { itemsQuery, itemQuery } = useItemsView();
  const { folder_id } = useParams();

  return useMutation({
    mutationKey: ["create-folder"],
    mutationFn: (formData: FolderForm) => FolderService.create(formData),
    onSuccess: (data: AxiosResponse["data"]) => {
      toast.success(data.message);
      if (folder_id) {
        itemQuery.refetch();
      } else {
        itemsQuery.refetch();
      }
    },
    onError: errorHandler,
  });
};

export const useRenameFolder = () => {
  const { itemsQuery, itemQuery } = useItemsView();
  const { folder_id } = useParams();

  return useMutation({
    mutationKey: ["rename-folder"],
    mutationFn: (data: RenameFolderForm) =>
      FolderService.update(data.id, { name: data.name }),
    onSuccess: (data: AxiosResponse["data"]) => {
      toast.success(data.message);
      if (folder_id) {
        itemQuery.refetch();
      } else {
        itemsQuery.refetch();
      }
    },
    onError: errorHandler,
  });
};
