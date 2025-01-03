export default function LoadingBookingCard() {
  return (
    <div className="card bg-base-100 shadow-xl mb-4 p-4 relative animate-pulse">
      {/* Pet name and employee skeleton */}
      <div className="flex gap-2 items-center">
        <div className="flex gap-3 items-center">
          <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="w-40 h-4 bg-gray-300 rounded ml-auto"></div>
      </div>

      {/* Business name skeleton */}
      <div className="mt-3 w-48 h-4 bg-gray-300 rounded"></div>

      {/* Services skeleton */}
      <div className="my-4 space-y-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex gap-3 items-center">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="w-40 h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Date and time skeleton */}
      <div className="flex gap-3 items-center">
        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
        <div className="w-56 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
