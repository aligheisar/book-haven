import { createPortal } from "react-dom";
import "./Loading.css";

let Loading = () => {
  return createPortal(
    <div className="loading-container">
      <div className="loading-items">
        <h1 className="text-2xl">loading</h1>
        <span className="radial"></span>
        <span className="radial d1"></span>
        <span className="radial d2"></span>
      </div>
    </div>,
    document.body,
  );
};

export default Loading;
