import { useModal } from "@/app/providers";
import type { BreadcrumbType } from "@/types";
import { File, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function DriveHeader({
  currentFolder,
}: {
  currentFolder: BreadcrumbType;
}) {
  const { modal } = useModal();

  const handleOpenNewFolder = () => modal("NewFolder", true);
  const handleOpenFileUpload = () => modal("NewFile", true);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">MyDrive</h2>
        <div className="flex items-center gap-3">
          <button className="btn rounded-2xl" onClick={handleOpenNewFolder}>
            <Plus size={20} />
            <span>New Folder</span>
          </button>
          <button
            className="btn btn-primary rounded-2xl"
            onClick={handleOpenFileUpload}
          >
            <File size={20} />
            <span>Upload</span>
          </button>
        </div>
      </div>

      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to={"/my-drive"}>My Drive</Link>
          </li>
          {currentFolder?.path?.map((path: { _id: string; name: string }) => (
            <li key={path?._id}>
              <Link to={`/my-drive/${path._id}`}>{path?.name}</Link>
            </li>
          ))}
          {currentFolder && (
            <li key={currentFolder?._id}>
              <span>{currentFolder?.name}</span>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
