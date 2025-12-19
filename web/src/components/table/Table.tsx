import { Link, useSearchParams } from "react-router-dom";
import {
  ArchiveRestore,
  ArchiveX,
  Edit,
  EllipsisVertical,
  Folder,
  Image,
  Star,
  Trash2,
} from "lucide-react";
import { formatByte, formatDate } from "@/utils";
import { useModal } from "@/app/providers";
import {
  useDeleteFolder,
  useRestoreFolder,
  useStarFolder,
  useTrashFolder,
  useUnstarFolder,
} from "@/queries/folder.queries";
import {
  useRestoreFile,
  useStarFile,
  useTrashFile,
  useUnstarFile,
} from "@/queries/file.queries";

interface TableDataProps {
  _id: string;
  name: string;
  size?: number;
  starred: boolean;
  trashed: boolean;
  mimeType?: string;
  updatedAt: string;
}

const FolderOption = ({ _id, name, trashed, starred }: TableDataProps) => {
  const [_, setSearchParams] = useSearchParams();
  const { modal } = useModal();
  const { isPending: isPendingStar, mutate: mutateStar } = useStarFolder();
  const { isPending: isPendingUnstar, mutate: mutateUnstar } =
    useUnstarFolder();
  const { isPending: isPendingTrash, mutate: mutateTrash } = useTrashFolder();
  const { isPending: isPendingRestore, mutate: mutateRestore } =
    useRestoreFolder();
  const { isPending: isPendingDelete, mutate: mutateDelete } =
    useDeleteFolder();

  const handleRenameClick = () => {
    const query = new URLSearchParams();
    query.set("folder_id", _id);
    query.set("folder_name", name);
    setSearchParams(query);
    modal("RenameFolder", true);
  };

  const handleClickStar = () => mutateStar(_id);
  const handleClickUnstar = () => mutateUnstar(_id);
  const handleClickTrash = () => mutateTrash(_id);
  const handleClickRestore = () => mutateRestore(_id);
  const handleClickDelete = () => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      mutateDelete(_id);
    }
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <button className="btn btn-sm btn-ghost btn-circle">
        <EllipsisVertical size={20} />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-300 rounded-box z-1 w-32 p-2 shadow-lg gap-1 border border-white/10"
      >
        {!trashed && (
          <>
            <li>
              <button onClick={handleRenameClick}>
                <Edit className="text-success" size={15} />
                <span>Rename</span>
              </button>
            </li>
            <li>
              {starred ? (
                <>
                  <button
                    onClick={handleClickUnstar}
                    disabled={isPendingUnstar}
                  >
                    <Star
                      className={`${starred ? "text-warning" : ""}`}
                      size={15}
                    />
                    <span>Star</span>
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleClickStar} disabled={isPendingStar}>
                    <Star
                      className={`${starred ? "text-warning" : ""}`}
                      size={15}
                    />
                    <span>Star</span>
                  </button>
                </>
              )}
            </li>
          </>
        )}
        <li>
          {trashed ? (
            <>
              <button onClick={handleClickRestore} disabled={isPendingRestore}>
                <ArchiveRestore size={15} />
                <span>Restore</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={handleClickTrash} disabled={isPendingTrash}>
                <ArchiveX size={15} />
                <span>Trash</span>
              </button>
            </>
          )}
        </li>
        <li>
          <button onClick={handleClickDelete} disabled={isPendingDelete}>
            <Trash2 className="text-error" size={15} />
            <span>Delete</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

const FileOption = ({ _id, name, trashed, starred }: TableDataProps) => {
  const [_, setSearchParams] = useSearchParams();
  const { modal } = useModal();
  const { isPending: isPendingStar, mutate: mutateStar } = useStarFile();
  const { isPending: isPendingUnstar, mutate: mutateUnstar } = useUnstarFile();
  const { isPending: isPendingTrash, mutate: mutateTrash } = useTrashFile();
  const { isPending: isPendingRestore, mutate: mutateRestore } =
    useRestoreFile();

  const handleClickStar = () => mutateStar(_id);
  const handleClickUnstar = () => mutateUnstar(_id);
  const handleClickTrash = () => mutateTrash(_id);
  const handleClickRestore = () => mutateRestore(_id);

  const handleRenameClick = () => {
    const query = new URLSearchParams();
    query.set("file_id", _id);
    query.set("file_name", name);
    setSearchParams(query);
    modal("RenameFile", true);
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <button className="btn btn-sm btn-ghost btn-circle">
        <EllipsisVertical size={20} />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-300 rounded-box z-1 w-32 p-2 shadow-lg gap-1 border border-white/10"
      >
        {!trashed && (
          <>
            <li>
              <button onClick={handleRenameClick}>
                <Edit className="text-success" size={15} />
                <span>Rename</span>
              </button>
            </li>
            <li>
              {starred ? (
                <>
                  <button
                    onClick={handleClickUnstar}
                    disabled={isPendingUnstar}
                  >
                    <Star
                      className={`${starred ? "text-warning" : ""}`}
                      size={15}
                    />
                    <span>Star</span>
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleClickStar} disabled={isPendingStar}>
                    <Star
                      className={`${starred ? "text-text" : ""}`}
                      size={15}
                    />
                    <span>Star</span>
                  </button>
                </>
              )}
            </li>
          </>
        )}
        <li>
          {trashed ? (
            <>
              <button onClick={handleClickRestore} disabled={isPendingRestore}>
                <ArchiveRestore size={15} />
                <span>Restore</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={handleClickTrash} disabled={isPendingTrash}>
                <ArchiveX size={15} />
                <span>Trash</span>
              </button>
            </>
          )}
        </li>
        <li>
          <button>
            <Trash2 className="text-error" size={15} />
            <span>Delete</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

function TableHead() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Modified</th>
        <th>Size</th>
        <th>Action</th>
      </tr>
    </thead>
  );
}

function TableData(props: TableDataProps) {
  const [_, setSearchParams] = useSearchParams();
  const { modal } = useModal();

  const handleClickPreview = () => {
    const query = new URLSearchParams();
    query.set("file_id", props._id);
    setSearchParams(query);
    modal("Preview", true);
  };

  return (
    <tr className="group hover:bg-base-300">
      <td className="flex items-center gap-2">
        {props.size ? (
          <span
            onClick={handleClickPreview}
            className="flex items-center gap-2 cursor-pointer hover:link"
          >
            <Image size={20} />
            <span className="line-clamp-1">{props.name}</span>
          </span>
        ) : (
          <>
            <Link
              to={`/my-drive/${props._id}`}
              className="flex items-center gap-2 cursor-pointer hover:link line-clamp-1"
            >
              <Folder size={20} />
              {props.name}
            </Link>
          </>
        )}
      </td>
      <td>
        <span>{formatDate(props.updatedAt)}</span>
      </td>
      <td>
        <span className="line-clamp-1">
          {props.size ? formatByte(props.size) : "__"}
        </span>
      </td>
      <td>
        {props.size ? <FileOption {...props} /> : <FolderOption {...props} />}
      </td>
    </tr>
  );
}

export function TableBody({ items = [] }: { items: TableDataProps[] }) {
  return (
    <tbody>
      {items?.map((item) => (
        <TableData key={item._id} {...item} />
      ))}
    </tbody>
  );
}

function TableLoading() {
  return (
    <div className="h-[200px] flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}

export function Table({
  children,
  isLoading = false,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <TableLoading />;
  }

  return (
    <table className="table table-zebra bg-base-200 table-pin-rows border border-white/10">
      <TableHead />
      {children}
    </table>
  );
}

export function NotFoundItems({ hasItems = false }: { hasItems: boolean }) {
  if (hasItems) return null;

  return (
    <div className="w-full h-[200px] flex items-center justify-center">
      <div>
        <p className="text-sm">No items found</p>
      </div>
    </div>
  );
}
