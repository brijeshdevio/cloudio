import { createPortal } from "react-dom";
import { useModal } from "@/app/providers";
import type { ModalsType } from "@/types";

export function ModalRoot({
  name,
  children,
}: {
  name: keyof ModalsType;
  children: React.ReactNode;
}) {
  const { modals, modal } = useModal();

  if (!modals[name]) return null;

  return createPortal(
    <div
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-base-300/80 z-[99999]"
      onClick={() => modal(name, false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full flex items-center justify-center p-3"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
