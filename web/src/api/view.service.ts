import type { Query } from "@/types";
import { http } from "./http";

export const ViewService = {
  getItems: async (query?: Query) =>
    (await http.get("/items", { params: query })).data,

  getItem: async (id: string) => (await http.get(`/folders/${id}`)).data,

  getRecent: async (query?: Query) =>
    (await http.get(`/recent`, { params: query })).data,

  getStars: async (query?: Query) =>
    (await http.get(`/stars`, { params: query })).data,

  getTrash: async (query?: Query) =>
    (await http.get(`/trash`, { params: query })).data,
};
