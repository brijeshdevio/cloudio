import { http } from "./http";

export const ViewService = {
  getItems: async () => (await http.get("/items")).data,
};
