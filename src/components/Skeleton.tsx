const Skeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse border bg-white shadow rounded-lg p-4 flex flex-col gap-3"
        >
          <div className="w-full h-48 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
