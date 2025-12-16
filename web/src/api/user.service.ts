import { http } from "./http";

export const UserService = {
  getProfile: async () => (await http.get("/users/me")).data,
};
