import type { FormEvent } from "react";
import { X } from "lucide-react";
import { useModal } from "@/app/providers";
import { useParams } from "react-router-dom";
import { useCreateFolder } from "@/queries/folder.queries";
import type { FolderForm } from "@/types/folder";

export function NewFolder() {
  const { modal } = useModal();
  const { folder_id } = useParams();
  const { mutateAsync, isPending } = useCreateFolder();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as FolderForm;
    if (folder_id) {
      data.parent = folder_id;
    }
    await mutateAsync(data).finally(handleClose);
  };

  const handleClose = () => modal("NewFolder", false);

  return (
    <div className="card bg-base-100 w-full max-w-[350px] sm:w-[350px] shadow">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">New Folder</h2>
          <button
            className="btn btn-circle btn-ghost text-error btn-sm"
            onClick={handleClose}
          >
            <X size={20} />
          </button>
        </div>
        <form className="mt-2" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input w-full rounded-2xl"
            placeholder="e.g. Documents"
            name="name"
            required
          />
          <div className="flex items-center justify-end gap-3 mt-5">
            <button
              className="btn btn-sm btn-error"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm btn-primary"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
