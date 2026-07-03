const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center gap-5">
        
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

        
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Processing your request...
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Loader;