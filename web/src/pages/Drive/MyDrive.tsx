import { File, Plus } from "lucide-react";
import {
  Breadcrumb,
  NotFoundItems,
  Pagination,
  Table,
  TableBody,
} from "@/components";
import { useItemsView } from "@/queries/views.queries";
import { useModal } from "@/app/providers";
import type { ModalsType } from "@/types";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function DriveHeader() {
  const { modal } = useModal();

  const handleOpenModal = (modalName: keyof ModalsType) => {
    return () => {
      modal(modalName, true);
    };
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl">MyDrive</h2>
      <div className="flex items-center gap-3">
        <button
          className="btn rounded-2xl"
          onClick={handleOpenModal("NewFolder")}
        >
          <Plus size={20} />
          <span>New Folder</span>
        </button>
        <button
          className="btn btn-primary rounded-2xl"
          onClick={handleOpenModal("NewFile")}
        >
          <File size={20} />
          <span>Upload</span>
        </button>
      </div>
    </div>
  );
}

export function MyDrive() {
  const { folder_id } = useParams();
  const [_, setSearchParams] = useSearchParams();
  const {
    folders,
    files,
    meta,
    isLoading,
    currentFolder,
    refetchItems,
    refetchItem,
  } = useItemsView();

  const handleClick = (page: number) => {
    setSearchParams({ page: page.toString() });
    setTimeout(() => {
      if (!folder_id && location.pathname === "/my-drive") refetchItems();
    }, 100);
  };

  useEffect(() => {
    if (!folder_id && location.pathname === "/my-drive") refetchItems();
  }, [refetchItems, folder_id]);

  useEffect(() => {
    if (folder_id && location.pathname === "/my-drive/" + folder_id)
      refetchItem();
  }, [refetchItem, folder_id]);

  return (
    <div className="w-full sm:w-[90%] flex flex-col gap-4 mx-auto px-3 py-6">
      {/* Header */}
      <section>
        <DriveHeader />
        <Breadcrumb currentFolder={currentFolder} />
      </section>

      {/* Items */}
      <section className="h-[60vh] overflow-y-scroll rounded-2xl">
        <Table isLoading={isLoading}>
          <TableBody items={folders} />
          <TableBody items={files} />
        </Table>
        <NotFoundItems hasItems={folders.length > 0 || files.length > 0} />
      </section>

      <section>
        <Pagination {...meta} onClick={handleClick} isLoading={isLoading} />
      </section>
    </div>
  );
}
