import { Sidebar, TopBar } from "@/components";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full bg-base-300">
        <TopBar />
        {children}
      </main>
    </div>
  );
}
