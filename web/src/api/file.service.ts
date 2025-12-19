import type { FileForm } from "@/types/file";
import { http } from "./http";

export const FileService = {
  upload: async (formData: FileForm) =>
    (
      await http.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data,

  getById: async (id: string) => (await http.get(`/files/${id}`)).data,

  star: async (id: string) => (await http.patch(`/files/${id}/star`)).data,

  unstar: async (id: string) => (await http.patch(`/files/${id}/unstar`)).data,
};
