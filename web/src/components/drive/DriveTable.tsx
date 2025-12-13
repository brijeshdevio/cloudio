import { Link } from "react-router-dom";
// import { generateItems } from "@/data";
import { EllipsisVertical } from "lucide-react";
import type { DriveTableProps } from "@/types";

export function DriveTable({ items = [] }: { items: DriveTableProps[] }) {
  return (
    <table className="table table-zebra bg-base-200 table-pin-rows">
      {/* head */}
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Modified</th>
          <th>Size</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item) => (
          <tr key={item._id} className="group">
            <td>
              {item.size ? (
                <>{item.name}</>
              ) : (
                <>
                  <Link to={`/my-drive/${item._id}`}>{item.name}</Link>
                </>
              )}
            </td>
            <td>{item.updatedAt}</td>
            <td>{item.size ? item.size : "__"}</td>
            <td>
              <button className="btn btn-sm btn-circle invisible group-hover:visible group-active:visible group-focus:visible">
                <EllipsisVertical size={20} className="opacity-80" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
