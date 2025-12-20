import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ViewService } from "@/api/view.service";

export const useItemsView = () => {
  const { folder_id } = useParams();
  const [query] = useSearchParams();

  const page = parseInt(query.get("page") || "1");
  const limit = parseInt(query.get("limit") || "10");
  const queries = { page, limit };

  const itemsQuery = useQuery({
    queryKey: ["items", queries],
    queryFn: () => ViewService.getItems(queries),
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
  const meta = itemQuery.data?.meta || itemsQuery.data?.meta;
  const currentFolder = itemQuery.data?.folder;

  return {
    folders,
    files,
    meta,
    isLoading: itemsQuery.isPending,
    currentFolder,
    refetchItem,
    refetchItems,
  };
};

export const useRecentView = () => {
  const [query] = useSearchParams();

  const page = parseInt(query.get("page") || "1");
  const limit = parseInt(query.get("limit") || "10");
  const queries = { page, limit };

  return useQuery({
    queryKey: ["recent", queries],
    queryFn: () => ViewService.getRecent(queries),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};

export const useStarsView = () => {
  const [query] = useSearchParams();

  const page = parseInt(query.get("page") || "1");
  const limit = parseInt(query.get("limit") || "10");
  const queries = { page, limit };

  return useQuery({
    queryKey: ["stars", queries],
    queryFn: () => ViewService.getStars(queries),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};

export const useTrashView = () => {
  const [query] = useSearchParams();

  const page = parseInt(query.get("page") || "1");
  const limit = parseInt(query.get("limit") || "10");
  const queries = { page, limit };

  return useQuery({
    queryKey: ["trash", queries],
    queryFn: () => ViewService.getTrash(queries),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
