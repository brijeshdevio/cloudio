import type { FolderForm } from "@/types/folder";
import { http } from "./http";

export const FolderService = {
  create: async (formData: FolderForm) =>
    (await http.post("/folders", formData)).data,

  update: async (id: string, formData: { name: string }) =>
    (await http.put(`/folders/${id}`, formData)).data,

  star: async (id: string) => (await http.patch(`/folders/${id}/star`)).data,

  unstar: async (id: string) =>
    (await http.patch(`/folders/${id}/unstar`)).data,

  trash: async (id: string) => (await http.patch(`/folders/${id}/trash`)).data,

  restore: async (id: string) =>
    (await http.patch(`/folders/${id}/restore`)).data,

  delete: async (id: string) => (await http.delete(`/folders/${id}`)).data,
};
