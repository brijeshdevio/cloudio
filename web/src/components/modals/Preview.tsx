import { useModal } from "@/app/providers";
import { useGetFile } from "@/queries/file.queries";
import { formatByte, formatDate } from "@/utils";
import { ArrowLeft, Image, X } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export function Preview() {
  const [query] = useSearchParams();
  const { data, refetch, isPending, isError } = useGetFile();
  const { modal } = useModal();

  useEffect(() => {
    if (query.get("file_id")) refetch();
  }, [refetch, query]);

  const handleClose = () => modal("Preview", false);

  const file = data?.file;

  if (isPending) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    handleClose();
    toast.error("File not found");
  }

  if (!file) return null;

  return (
    <div className="min-w-[80vw] h-[80vh] min-h-[300px] bg-base-100 shadow rounded-xl border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between p-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <button
            className="btn btn-circle btn-sm btn-ghost"
            onClick={handleClose}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Image size={20} />
            <span className="text-sm opacity-70 line-clamp-1">
              {file?.name}
            </span>
          </div>
        </div>
        <div>
          <button
            className="btn btn-circle btn-sm btn-ghost"
            onClick={handleClose}
          >
            <X size={20} />
          </button>
        </div>
      </div>
      <div className="sm:flex items-center gap-2 h-full">
        <div className="text-center mx-auto p-3">
          <img
            src={file?.secureUrl}
            alt={file?.name}
            className="max-w-[60%] mx-auto"
          />
        </div>
        <div className="w-full sm:w-72 h-full flex flex-col gap-3 p-3 border-l border-white/10">
          <h2>File Details</h2>
          <div className="border-t border-white/10" />
          <div className="grid grid-cols-2 text-sm">
            <span className="opacity-70">Name:</span>{" "}
            <span className="line-clamp-1">{file?.name}</span>
          </div>
          <div className="border-t border-white/10" />
          <div className="grid grid-cols-2 text-sm">
            <span className="opacity-70">Type:</span>{" "}
            <span>{file?.mimeType}</span>
          </div>
          <div className="border-t border-white/10" />
          <div className="grid grid-cols-2 text-sm">
            <span className="opacity-70">Size:</span>{" "}
            <span>{formatByte(file?.size)}</span>
          </div>
          <div className="border-t border-white/10" />
          <div className="grid grid-cols-2 text-sm">
            <span className="opacity-70">Last Modified:</span>{" "}
            <span>{formatDate(file?.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
