import "./Loading.css";

let Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-items">
        <h1 className="text-2xl">loading</h1>
        <span className="radial"></span>
        <span className="radial d1"></span>
        <span className="radial d2"></span>
      </div>
    </div>
  );
};

export default Loading;
