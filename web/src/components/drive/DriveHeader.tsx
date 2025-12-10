import { useModal } from "@/app/providers";
import { File, Plus } from "lucide-react";

export function DriveHeader() {
  const { modal } = useModal();

  const handleOpenNewFolder = () => modal("NewFolder", true);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">MyDrive</h2>
        <div className="flex items-center gap-3">
          <button className="btn rounded-2xl" onClick={handleOpenNewFolder}>
            <Plus size={20} />
            <span>New Folder</span>
          </button>
          <button className="btn btn-primary  rounded-2xl">
            <File size={20} />
            <span>Upload</span>
          </button>
        </div>
      </div>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a>MyDrive</a>
          </li>
          <li>
            <a>Documents</a>
          </li>
          <li>Add Document</li>
        </ul>
      </div>
    </>
  );
}
