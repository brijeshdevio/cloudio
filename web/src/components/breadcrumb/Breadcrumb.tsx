import { Link } from "react-router-dom";
import type { BreadcrumbType } from "@/types";

export function Breadcrumb({
  currentFolder,
}: {
  currentFolder: BreadcrumbType;
}) {
  return (
    <>
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
