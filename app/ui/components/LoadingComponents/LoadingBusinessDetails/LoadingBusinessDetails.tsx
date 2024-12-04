export default function LoadingBusinessDetails() {
  return (
    <div className="w-[90vw] lg:w-[600px] m-auto flex-col gap-4 items-center mt-10 pb-20">
      {/* Back button skeleton */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-20 h-6 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Card skeleton */}
      <div className="card bg-base-100 shadow-xl">
        {/* Image carousel skeleton */}
        <div className="relative h-[300px] bg-gray-300 animate-pulse rounded-t-lg"></div>

        {/* Card body skeleton */}
        <div className="card-body mt-6">
          {/* Groomer name */}
          <div className="w-40 h-6 bg-gray-300 rounded animate-pulse mb-2"></div>

          {/* Address */}
          <div className="w-full h-4 bg-gray-300 rounded animate-pulse mb-4"></div>
          <div className="w-[80%] h-4 bg-gray-300 rounded animate-pulse"></div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 justify-between">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-20 h-8 bg-gray-300 rounded animate-pulse"
              ></div>
            ))}
          </div>

          {/* Reviews/Photos/About Section */}
          <div className="mt-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-6">
                {/* Review description */}
                <div className="w-full h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="w-[70%] h-4 bg-gray-300 rounded animate-pulse"></div>
                {/* Date */}
                <div className="w-24 h-3 bg-gray-300 rounded animate-pulse mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
