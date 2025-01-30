import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../Backdrop";
import useKeybordShortcuts from "../../hooks/use-keybord-shortcuts";
import { cn } from "../../util/cn.ts";

let Modal = ({ children, onOpen, onClose, className, ...props }) => {
  let [isOpen, setIsOpen] = useState(true);

  let backdrop = useRef();

  let closeModal = useCallback(() => {
    backdrop.current.classList.remove("active");

    setTimeout(() => {
      onClose();
      setIsOpen(false);
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) closeModal();
    setTimeout(() => {
      backdrop?.current?.classList.add("active");
    }, 0);
  }, [isOpen, closeModal]);

  useKeybordShortcuts({
    27: { func: () => closeModal() },
  });

  return createPortal(
    <Backdrop ref={backdrop} onClose={closeModal}>
      <section
        onClick={(e) => e.stopPropagation()}
        {...props}
        className={cn(
          "absolute right-12 top-16 rounded-md bg-surface p-2 shadow-lg transition-all duration-300",
          className,
        )}
      >
        {children}
      </section>
    </Backdrop>,
    document.body,
  );
};

export default Modal;
