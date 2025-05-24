import React from 'react'

const Loading = () => {
  return (
    <div>
        <div className="mx-auto mt-9 w-[1080px]  max-w-sm rounded-md border-none p-4 shadow-lg">
  <div className="flex animate-pulse space-x-4">
    <div className="size-10 rounded-full bg-gray-200"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 rounded bg-gray-200"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-2 rounded bg-gray-200"></div>
          <div className="col-span-1 h-2 rounded bg-gray-200"></div>
        </div>
        <div className="h-2 rounded bg-gray-200"></div>
      </div>
    </div>
  </div>
</div>
</div>
  )
}

export default Loading