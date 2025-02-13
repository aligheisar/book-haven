import { createContext, useEffect, useRef, useState } from "react";
import useKeybordShortcuts from "../../hooks/use-keybord-shortcuts.jsx";
import { cn } from "../../util/cn.ts";
import { VerticalMenu } from "../ui/Icons.jsx";
import Backdrop from "../Backdrop.jsx";

export let MenuContext = createContext();

let Menu = ({ children, className, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  let menuRef = useRef();

  let handleWindowResize = (e) => {
    let menuRect = menuRef.current?.getBoundingClientRect();

    if (menuRect) {
      if (menuRect.right > window.innerWidth - 10)
        menuRef.current.classList.add("left");
      else if (menuRect.right < window.innerWidth - menuRect.width + 10) {
        menuRef.current.classList.remove("left");
      }
    }
  };

  useEffect(() => {
    handleWindowResize();
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useKeybordShortcuts({
    27: { func: () => setIsOpen(false) },
  });

  let contextValues = { setIsOpen };
  return (
    <div className={cn("", className)} {...props}>
      <span
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center rounded-sm fill-text p-1 hover:bg-text/5"
      >
        <VerticalMenu className="rotate-90" inher />
      </span>
      {isOpen && (
        <>
          <Backdrop
            className="z-10 bg-transparent"
            onClose={() => setIsOpen(false)}
          />
          <section
            ref={menuRef}
            className="menu absolute left-0 top-8 z-10 flex flex-col gap-[2px] rounded border border-secondary-surface bg-surface/80 p-1 shadow-lg backdrop-blur-lg"
          >
            {
              <MenuContext.Provider value={contextValues}>
                {children}
              </MenuContext.Provider>
            }
          </section>
        </>
      )}
    </div>
  );
};

export default Menu;
