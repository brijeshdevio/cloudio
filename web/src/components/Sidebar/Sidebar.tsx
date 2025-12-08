import { Plus } from "lucide-react";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarMenu } from "./SidebarMenu";

export function Sidebar() {
  return (
    <aside className="relative w-72 h-screen bg-base-200 px-3 py-5 border-r border-white/10 shadow">
      <div className="flex flex-col gap-5">
        {/* Header */}
        <SidebarHeader />

        {/* New Button */}
        <div className="text-center">
          <button className="btn btn-primary w-28 mx-auto">
            <Plus size={20} />
            <span>New</span>
          </button>
        </div>

        {/* Menu */}
        <SidebarMenu />

        {/* Bottom */}
        <div className="absolute bottom-5 left-0 w-full px-3">
          <button className="btn btn-primary btn-sm w-full">
            Upgrade Storage
          </button>
        </div>
      </div>
    </aside>
  );
}
