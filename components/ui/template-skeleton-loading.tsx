import { Skeleton } from "@/components/ui/skeleton";
export const OneColumnSkeletonLoading = () => {
  return (
    <div className="w-[210mm] min-h-[297mm] p-8 bg-white  shadow-lg">
      {/* Header */}
      <section className="mb-3.5">
        <Skeleton className="h-9 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mb-3" />

        <div className="flex flex-wrap gap-4 mt-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </section>

      {/* Experience */}
      <section className="mb-4">
        <Skeleton className="h-6 w-32 mb-3 border-b border-gray-300 pb-1" />

        {/* Experience Item 1 */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-3 w-56 mb-2" />
          <div className="ml-5 space-y-1.5">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </div>
        </div>

        {/* Experience Item 2 */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-3 w-28" />
          </div>
          <Skeleton className="h-3 w-32 mb-2" />
          <div className="ml-5 space-y-1.5">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-4">
        <Skeleton className="h-6 w-24 mb-3 border-b border-gray-300 pb-1" />

        {/* Project Item 1 */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="ml-5 space-y-1.5">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </div>
        </div>

        {/* Project Item 2 */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="ml-5 space-y-1.5">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-3.5">
        <Skeleton className="h-6 w-20 mb-3 border-b border-gray-300 pb-1" />
        <div className="grid grid-cols-2 gap-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </section>

      {/* Education */}
      <section>
        <Skeleton className="h-6 w-28 mb-3 border-b border-gray-300 pb-1" />
        <div className="flex justify-between items-center mb-1">
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-3 w-40" />
      </section>
    </div>
  );
};

export const TwoColumnSkeletonLoading = () => {
  return (
    <div className="w-[210mm] min-h-[297mm] p-8 bg-white text-gray-900 shadow-lg">
      {/* Header - Full Width */}
      <section className="mb-3.5">
        <Skeleton className="h-9 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mb-3" />

        <div className="flex flex-wrap gap-4 mt-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Experience */}
          <section>
            <Skeleton className="h-6 w-32 mb-3 border-b border-gray-300 pb-1" />

            {/* Experience Item 1 */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-3 w-48 mb-2" />
              <div className="ml-5 space-y-1.5">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
              </div>
            </div>

            {/* Experience Item 2 */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-3 w-28 mb-2" />
              <div className="ml-5 space-y-1.5">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          </section>

          {/* Projects */}
          <section>
            <Skeleton className="h-6 w-24 mb-3 border-b border-gray-300 pb-1" />

            {/* Project Item 1 */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-12" />
              </div>
              <div className="ml-5 space-y-1.5">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
              </div>
            </div>

            {/* Project Item 2 */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-12" />
              </div>
              <div className="ml-5 space-y-1.5">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Skills */}
          <section>
            <Skeleton className="h-6 w-20 mb-3 border-b border-gray-300 pb-1" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </section>

          {/* Education */}
          <section>
            <Skeleton className="h-6 w-28 mb-3 border-b border-gray-300 pb-1" />
            <div className="flex justify-between items-center mb-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-3 w-32" />
          </section>

          {/* Additional Section Placeholder */}
          <section>
            <Skeleton className="h-6 w-32 mb-3 border-b border-gray-300 pb-1" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/6" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
