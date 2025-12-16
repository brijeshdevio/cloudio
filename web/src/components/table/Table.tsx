import { Link } from "react-router-dom";
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

interface TableDataProps {
  _id: string;
  name: string;
  size?: number;
  starred: boolean;
  trashed: boolean;
  mimeType?: string;
  updatedAt: string;
}

interface OptionProps {
  id: string;
  isFile: boolean;
  starred: boolean;
  isTrashed: boolean;
}

const Option = ({ starred = false, isTrashed }: OptionProps) => {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <button className="btn btn-sm btn-ghost btn-circle">
        <EllipsisVertical size={20} />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-300 rounded-box z-1 w-32 p-2 shadow-lg gap-1 border border-white/10"
      >
        {!isTrashed && (
          <>
            <li>
              <button>
                <Edit className="text-success" size={15} />
                <span>Rename</span>
              </button>
            </li>
            <li>
              <button
              // onClick={handleStarToggle(id, isFile, starred)}
              // disabled={isStarLoading}
              >
                <Star
                  className={`${starred ? "text-warning" : ""}`}
                  size={15}
                />
                <span>Star</span>
              </button>
            </li>
          </>
        )}
        <li>
          <button
          // onClick={handleTrashToggle(id, isFile, isTrashed)}
          // disabled={isTrashLoading}
          >
            {isTrashed ? (
              <>
                <ArchiveRestore size={15} />
                <span>Restore</span>
              </>
            ) : (
              <>
                <ArchiveX size={15} />
                <span>Trash</span>
              </>
            )}
          </button>
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

function TableData({
  _id,
  name,
  size,
  updatedAt,
  starred,
  trashed,
}: TableDataProps) {
  return (
    <tr className="group hover:bg-base-300">
      <td className="flex items-center gap-2">
        {size ? (
          <Link
            to={`#${_id}`}
            className="flex items-center gap-2 cursor-pointer hover:link"
          >
            <Image size={20} />
            <span className="line-clamp-1">{name}</span>
          </Link>
        ) : (
          <>
            <Link
              to={`/my-drive/${_id}`}
              className="flex items-center gap-2 cursor-pointer hover:link line-clamp-1"
            >
              <Folder size={20} />
              {name}
            </Link>
          </>
        )}
      </td>
      <td>
        <span>{formatDate(updatedAt)}</span>
      </td>
      <td>
        <span className="line-clamp-1">{size ? formatByte(size) : "__"}</span>
      </td>
      <td>
        <Option
          id={_id}
          isFile={!!size}
          starred={starred}
          isTrashed={!!trashed}
        />
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
