import { BadgeQuestionMark, Search, Settings, User } from "lucide-react";
import type { ComponentType } from "react";

interface IconBtnProps extends React.HTMLAttributes<HTMLButtonElement> {
  Icon: ComponentType<{ size?: number; className?: string }>;
}

function IconBtn({ Icon }: IconBtnProps) {
  return (
    <button className="btn btn-circle btn-sm">
      <Icon size={20} />
    </button>
  );
}

export function TopBar() {
  return (
    <header className="w-full px-3 py-2 bg-base-100 border-b border-white/10">
      <div className="w-full sm:w-[90%] flex items-center justify-between mx-auto">
        {/* Search */}
        <form>
          <label className="input w-[500px] rounded-2xl">
            <Search size={20} className="opacity-70" />
            <input type="text" placeholder="Search" />
          </label>
        </form>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <IconBtn Icon={BadgeQuestionMark} />
          <IconBtn Icon={User} />
          <IconBtn Icon={Settings} />
        </div>
      </div>
    </header>
  );
}
