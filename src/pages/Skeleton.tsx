"use client";

import { SkeletonBase } from "@/components/ui/SkeletonBase";

export const SkeletonPage = () => {
  return (
    <div className="p-6 flex flex-col gap-10">

      <div className="flex gap-5">
        <SkeletonBase className="w-[350px] h-24 rounded-2xl" />
        <SkeletonBase className="w-[350px] h-24 rounded-2xl" />
      </div>

      <div className="flex items-center gap-4">
        <SkeletonBase className="w-14 h-14 rounded-full" />
        <div className="flex flex-col gap-2">
          <SkeletonBase className="w-[200px] h-4 rounded-md" />
          <SkeletonBase className="w-[150px] h-4 rounded-md" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <SkeletonBase className="w-10 h-10 rounded-md" />
            <SkeletonBase className="w-full h-4 rounded-md" />
            <SkeletonBase className="w-[80px] h-4 rounded-md" />
          </div>
        ))}
      </div>

      {/* Skeleton de Input com Label */}
      <div className="flex flex-col gap-2">
        <SkeletonBase className="w-[100px] h-4 rounded" />
        <SkeletonBase className="w-full h-10 rounded-md" />
      </div>

      <div className="flex gap-4">
        <SkeletonBase className="w-[100px] h-10 rounded-md" />
        <SkeletonBase className="w-[150px] h-10 rounded-md" />
      </div>

      <SkeletonBase className="w-full h-[200px] rounded-xl" />

      <div className="my-20">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import { SkeletonBase } from "@/components/ui/SkeletonBase";`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<SkeletonBase className="w-14 h-14 rounded-full" />
<SkeletonBase className="w-full h-4 rounded-md" />
<SkeletonBase className="w-[350px] h-24 rounded-2xl" />`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
