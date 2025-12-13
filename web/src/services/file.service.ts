import type { UploadFileType } from "@/types";
import { axiosClient } from "./axiosClient";

export const uploadFile = async (data: UploadFileType) =>
  (
    await axiosClient.post("/files/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
