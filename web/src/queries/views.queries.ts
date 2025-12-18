import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ViewService } from "@/api/view.service";

export const useItemsView = () => {
  const { folder_id } = useParams();

  const itemsQuery = useQuery({
    queryKey: ["items"],
    queryFn: () => ViewService.getItems(),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const itemQuery = useQuery({
    queryKey: ["items", folder_id],
    queryFn: () => ViewService.getItem(folder_id!),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const refetchItems = itemsQuery.refetch;
  const refetchItem = itemQuery.refetch;

  const folders = itemQuery.data?.folders || itemsQuery.data?.folders || [];
  const files = itemQuery.data?.files || itemsQuery.data?.files || [];
  const currentFolder = itemQuery.data?.folder;

  return {
    folders,
    files,
    isLoading: itemsQuery.isPending,
    currentFolder,
    refetchItem,
    refetchItems,
  };
};

export const useRecentView = () => {
  return useQuery({
    queryKey: ["recent"],
    queryFn: () => ViewService.getRecent(),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};

export const useStarsView = () => {
  return useQuery({
    queryKey: ["stars"],
    queryFn: () => ViewService.getStars(),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};

export const useTrashView = () => {
  return useQuery({
    queryKey: ["trash"],
    queryFn: () => ViewService.getTrash(),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
