import { CloudUpload } from "lucide-react";
import { Link } from "react-router-dom";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-screen flex items-center justify-center bg-base-300 p-3">
      <section className="w-full max-w-[350px] flex flex-col gap-3">
        <div className="mx-auto bg-primary w-fit p-3 rounded-2xl">
          <Link to={"/"}>
            <CloudUpload size={30} className="text-white mx-auto" />
          </Link>
        </div>
        {children}
      </section>
    </main>
  );
}
