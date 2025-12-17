import { Link } from "react-router-dom";
import { CloudUpload, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((pre) => !pre);
  };

  return (
    <nav className="relative w-full px-3 py-2 sm:px-5 border-b border-white/5 bg-base-100 z-70">
      <div className="w-full sm:w-[95%] flex items-center gap-5 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 logo">
          <CloudUpload size={30} className="text-primary" />
          <span className="text-xl font-black">Cloudio</span>
        </Link>

        <div className="ml-auto md:hidden">
          <button className="btn btn-sm btn-ghost" onClick={handleMenuToggle}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div
          className={`absolute top-[55px] left-0 w-full ${
            isMenuOpen ? "flex" : "hidden"
          }  md:hidden flex-col gap-2  p-3 bg-base-100 border-b border-white/5 shadow`}
        >
          <Link
            to="/register"
            className="btn btn-sm btn-primary w-full flex items-center justify-start"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="btn btn-sm btn-ghost w-full flex items-center justify-start"
          >
            Log in
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3 ml-auto">
          <Link to="/login" className="btn btn-ghost btn-sm">
            Log in
          </Link>
          <Link to="/signup" className="btn btn-primary btn-sm">
            Sign Up for free
          </Link>
        </div>
      </div>
    </nav>
  );
}
