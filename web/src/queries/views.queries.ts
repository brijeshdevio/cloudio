import { useQuery } from "@tanstack/react-query";
import { ViewService } from "@/api/view.service";
import { useEffect } from "react";

export const useItemsView = () => {
  const query = useQuery({
    queryKey: ["items"],
    queryFn: () => ViewService.getItems(),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const refetch = query.refetch;
  const folders = query.data?.folders || [];
  const files = query.data?.files || [];

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    refetch,
    folders,
    files,
    isLoading: query.isPending,
  };
};
