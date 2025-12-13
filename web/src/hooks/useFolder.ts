import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { createFolder, getFolder, getFolders } from "@/services/folder.service";
import type { CreateFolderType } from "@/types";
import { errorHandler } from "@/utils";

export function useFolder() {
  const { FOLDER_ID } = useParams();
  const createFolderMutation = useMutation({
    mutationKey: ["create-folder"],
    mutationFn: async (data: CreateFolderType) => await createFolder(data),
    onSuccess: (data: AxiosResponse["data"]) => {
      toast.success(data.message);
      getFoldersQuery.refetch();
    },
    onError: errorHandler,
  });

  const getFoldersQuery = useQuery({
    queryKey: ["folders"],
    queryFn: async () => await getFolders(),
    enabled: false,
  });

  const getFolderQuery = useQuery({
    queryKey: ["folders", FOLDER_ID],
    queryFn: async () => await getFolder(FOLDER_ID!),
    enabled: false,
  });

  return { createFolderMutation, getFoldersQuery, getFolderQuery };
}
