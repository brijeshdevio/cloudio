import { CloudUpload, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { useModal } from "@/app/providers";
import { useRef, useState, type FormEvent } from "react";
import { useFile } from "@/hooks/useFile";
import type { UploadFileType } from "@/types";

export function FileUpload() {
  const { FOLDER_ID } = useParams();
  const { modal } = useModal();
  const [file, setFile] = useState<File | null>(null);
  const { mutateAsync, isPending } = useFile().uploadFileMutation;
  const handleClose = () => modal("NewFile", false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSelectFile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (FOLDER_ID) {
      formData.append("folder", FOLDER_ID);
    }

    formData.append("file", file as Blob);
    const data = Object.fromEntries(formData.entries());
    // await mutateAsync(data as UploadFileType).finally(handleClose);
  };

  return (
    <div className="card bg-base-100 w-full max-w-[450px] sm:w-[450px] shadow">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Upload Files</h2>
          <button
            className="btn btn-circle btn-ghost text-error btn-sm"
            onClick={handleClose}
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            name="file"
            id="file"
            className="invisible"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            ref={fileRef}
          />
          <div className="w-full flex flex-col gap-2 py-6 border border-dashed border-white/10 rounded-3xl text-center">
            <div className="bg-primary w-fit mx-auto text-white p-2 rounded-2xl">
              <CloudUpload />
            </div>
            <h3 className="text-md">Drag & Drop files here</h3>
            <p className="badge mx-auto">Or</p>
            <div>
              <button
                className="btn rounded-2xl"
                type="button"
                onClick={handleSelectFile}
              >
                Browse Files
              </button>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 mt-5">
            <button
              className="btn btn-sm btn-error"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className="btn btn-sm btn-primary" disabled={isPending}>
              {isPending ? (
                <span className=" loading loading-spinner"></span>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
