import { createPortal } from "react-dom";
import "./FloatingSpinner.css";

let FloatingSpinner = ({ title }) => {
  return createPortal(
    <section className="absolute left-1/2 top-1/2 flex size-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-secondary-surface/80 pt-10 shadow-lg backdrop-blur-xl">
      <div className="loading-items">
        <h1 className="text-2xl">{title}</h1>
        <span className="radial"></span>
        <span className="radial d1"></span>
        <span className="radial d2"></span>
      </div>
    </section>,
    document.body,
  );
};

export default FloatingSpinner;
