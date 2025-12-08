import { user } from "@/data";

export function SidebarHeader() {
  return (
    <div className="flex items-center gap-2 w-fit mx-auto">
      <div className="avatar avatar-placeholder">
        <div className="bg-neutral text-neutral-content w-10 rounded-full">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <span className="text-xs">{user.name?.[0]}</span>
          )}
        </div>
      </div>
      <div>
        <h3 className="leading-4 text-md">{user.name}</h3>
        <p className="text-sm opacity-70">{user.email}</p>
      </div>
    </div>
  );
}
