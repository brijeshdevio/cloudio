import { items } from "@/data";
import { formatTime } from "@/utils";
import { EllipsisVertical } from "lucide-react";

export function MyDrive() {
  return (
    <div className="w-full sm:w-[90%] flex flex-col gap-3 mx-auto p-3">
      <section className="">
        <h2 className="text-xl">MyDrive</h2>
      </section>
      <section>
        <div className="overflow-x-auto bg-base-300 rounded-md">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th>Name</th>
                <th>Date Modified</th>
                <th>File Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{formatTime(item.lastModified)}</td>
                  <td>{item.sizeKB ? item.sizeKB + " KB" : "__"}</td>
                  <td>
                    <EllipsisVertical size={20} className="opacity-70" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
