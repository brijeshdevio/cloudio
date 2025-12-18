import { ArrowLeft, Image, X } from "lucide-react";

export function Preview() {
  return (
    <div className="min-w-[80vw] h-[80vh] min-h-[300px] bg-base-100 shadow rounded-xl border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between p-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <button className="btn btn-circle btn-sm btn-ghost">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Image size={20} />
            <span className="text-sm opacity-70">230067267.png</span>
          </div>
        </div>
        <div>
          <button className="btn btn-circle btn-sm btn-ghost">
            <X size={20} />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 h-full">
        <div className="text-center mx-auto">
          <img src="https://placehold.co/200x200?text=girl" alt="" />
        </div>
        <div className="w-72 h-full flex flex-col gap-3 p-3 border-l border-white/10">
          <h2>File Details</h2>
          <div className="border-t border-white/10" />
          <div className="grid grid-cols-2 text-sm">
            <span className="opacity-70">Name:</span> <span>Alphe.jpg</span>
          </div>
          <div className="border-t border-white/10" />
          <div className="grid grid-cols-2 text-sm">
            <span className="opacity-70">Type:</span> <span>image/jpeg</span>
          </div>
          <div className="border-t border-white/10" />
          <div className="grid grid-cols-2 text-sm">
            <span className="opacity-70">Size:</span> <span>2.3 MB</span>
          </div>
          <div className="border-t border-white/10" />
          <div className="grid grid-cols-2 text-sm">
            <span className="opacity-70">Last Modified:</span> <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
