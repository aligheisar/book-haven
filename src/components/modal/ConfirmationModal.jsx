import { useEffect, useRef } from "react";
import Backdrop from "../Backdrop";
import Button from "../ui/Button.tsx";

let ConfirmationModal = ({ title, desc, onClose, closeModal }) => {
  let backdropRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      backdropRef.current.classList.add("active");
    }, 0);
  }, []);

  let handleCloseModal = (result) => {
    backdropRef.current.classList.remove("active");
    setTimeout(() => {
      onClose(result);
      closeModal();
    }, 300);
  };

  return (
    <Backdrop ref={backdropRef} onClose={() => handleCloseModal(false)}>
      <section
        onClick={(e) => e.stopPropagation()}
        className="backdrop-child absolute left-1/2 top-1/2 flex max-w-80 -translate-x-1/2 -translate-y-1/2 flex-col gap-5 rounded-xl bg-secondary-surface px-3 py-4 shadow-xl transition-all duration-300"
      >
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-serif text-3xl text-primary">{title}</h1>
          <p className="w-2/3 text-center text-secondary-text/70">{desc}</p>
        </div>
        <div className="flex gap-1">
          <Button
            varient="normal"
            className="flex-1 rounded"
            onClick={() => handleCloseModal(true)}
          >
            Confirm
          </Button>
          <Button
            varient="dim"
            className="flex-1 rounded"
            onClick={() => handleCloseModal(false)}
          >
            Decline
          </Button>
        </div>
      </section>
    </Backdrop>
  );
};

export default ConfirmationModal;
