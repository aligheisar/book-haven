let GenreItem = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className="relative flex items-center text-nowrap rounded-full border border-text/20 bg-secondary/60 px-2 text-text transition-colors after:absolute after:inset-0 after:flex after:justify-center after:rounded-full after:bg-danger/40 after:opacity-0 after:backdrop-blur-md after:transition-opacity after:content-['X'] hover:border-danger hover:bg-danger/30 hover:after:opacity-100"
    >
      {children}
    </div>
  );
};

export default GenreItem;
