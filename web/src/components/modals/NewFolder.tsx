import { X } from "lucide-react";
import { useModal } from "@/app/providers";

export function NewFolder() {
  const { modal } = useModal();
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
        <form className="mt-2">
          <input
            type="text"
            className="input w-full rounded-2xl"
            placeholder="Folder Name"
          />
          <div className="flex items-center justify-end gap-3 mt-5">
            <button
              className="btn btn-sm btn-error"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className="btn btn-sm btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
