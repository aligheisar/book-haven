let BookImagePlaceholder = ({ bg }) => {
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${bg} text-lg`}
    >
      <h2 className="text-center text-secondary">No Book Image</h2>
    </div>
  );
};

export default BookImagePlaceholder;
