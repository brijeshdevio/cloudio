import { useEffect } from "react";
import { DriveHeader, DriveTable, Pagination } from "@/components";
import { useFolder } from "@/hooks/useFolder";
import { useParams } from "react-router-dom";

export function MyDrive() {
  const { FOLDER_ID } = useParams();
  const { getFoldersQuery, getFolderQuery } = useFolder();

  useEffect(() => {
    if (FOLDER_ID) {
      getFolderQuery.refetch();
    } else {
      getFoldersQuery.refetch();
    }
  }, [getFoldersQuery, getFolderQuery, FOLDER_ID]);

  const folders =
    getFolderQuery.data?.subFolders || getFoldersQuery.data?.subFolders;

  return (
    <div className="w-full sm:w-[90%] flex flex-col gap-4 mx-auto px-3 py-6">
      {/* Header */}
      <section>
        <DriveHeader />
      </section>

      {/* Items */}
      <section className="h-[60vh] overflow-y-scroll rounded-2xl">
        <DriveTable items={folders} />
      </section>

      <section>
        <Pagination />
      </section>
    </div>
  );
}
