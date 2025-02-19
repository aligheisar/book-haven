import { useEffect, useRef } from "react";
import { cn } from "../../util/cn.ts";
import useKeybordShortcuts from "../../hooks/use-keybord-shortcuts.jsx";
import Backdrop from "../Backdrop.jsx";

let CustomModal = ({
  children,
  onClose,
  closeModal,
  closeOnClick,
  className,
  ...props
}) => {
  let backdropRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      backdropRef.current?.classList.add("active");
    }, 0);
  }, []);

  let handleCloseModal = () => {
    backdropRef.current.classList.remove("active");
    setTimeout(() => {
      onClose?.();
      closeModal();
    }, 300);
  };

  useKeybordShortcuts({
    27: { func: () => handleCloseModal() },
  });

  return (
    <Backdrop ref={backdropRef} onClose={handleCloseModal}>
      <section
        onClick={(e) => {
          !closeOnClick && e.stopPropagation();
        }}
        {...props}
        className={cn(
          "backdrop-child absolute rounded-md bg-surface p-2 shadow-lg transition-all duration-300",
          className,
        )}
      >
        {children}
      </section>
    </Backdrop>
  );
};

export default CustomModal;
