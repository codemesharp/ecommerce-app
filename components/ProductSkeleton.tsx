export default function ProductSkeleton() {
  return (
    <div className="animate-pulse flex flex-col md:flex-row gap-8 p-8">
      <div className="bg-gray-200 h-[400px] w-full md:w-1/2 rounded-lg" />
      <div className="flex-1 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-6 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-10 bg-gray-300 rounded w-40 mt-6" />
      </div>
    </div>
  );
}
