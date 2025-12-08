import { Link } from "react-router-dom";
import { Search, Settings, User } from "lucide-react";

export function ProtectNavbar() {
  return (
    <nav className="px-5 py-2 bg-base-200 border-b border-white/10">
      <div className="w-full sm:w-[90%] mx-auto  flex items-center justify-between">
        <form
          className="me-auto tooltip tooltip-bottom"
          data-tip="Upcoming"
          onFocus={(e) => e.preventDefault()}
        >
          <label className="input w-[600px] rounded-full" htmlFor="search">
            <Search className="" size={20} />
            <input type="text" id="search" placeholder="Search Cloud" />
          </label>
        </form>

        <div className="flex items-center gap-3">
          <Link
            to="/settings"
            className="btn btn-sm btn-ghost btn-circle tooltip tooltip-left cursor-not-allowed"
            data-tip="Upcoming"
            onClick={(e) => e.preventDefault()}
          >
            <Settings size={20} />
          </Link>
          <Link
            to="/settings"
            className="btn btn-sm btn-ghost btn-circle
          tooltip tooltip-left cursor-not-allowed"
            data-tip="Upcoming"
            onClick={(e) => e.preventDefault()}
          >
            <User size={18} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
