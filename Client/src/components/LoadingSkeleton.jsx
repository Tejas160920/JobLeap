import React from "react";

// Generic skeleton pulse animation component
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

// Job Card Skeleton
export const JobCardSkeleton = () => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
    <div className="flex items-start space-x-4">
      <Skeleton className="w-14 h-14 rounded-xl" />
      <div className="flex-1">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-3" />
        <div className="flex space-x-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

// Job Details Skeleton
export const JobDetailsSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
    <div className="bg-gray-100 p-6 border-b border-gray-200">
      <Skeleton className="h-10 w-3/4 mb-4" />
      <Skeleton className="h-6 w-1/2 mb-4" />
      <Skeleton className="h-4 w-2/3 mb-6" />
      <div className="flex space-x-3 mb-6">
        <Skeleton className="h-10 w-32 rounded-full" />
        <Skeleton className="h-10 w-28 rounded-full" />
        <Skeleton className="h-10 w-36 rounded-full" />
      </div>
      <div className="flex space-x-4">
        <Skeleton className="h-12 flex-1 rounded-lg" />
        <Skeleton className="h-12 w-40 rounded-lg" />
      </div>
    </div>
    <div className="p-6">
      <Skeleton className="h-8 w-48 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
    </div>
  </div>
);

// Application Card Skeleton
export const ApplicationCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        <Skeleton className="h-6 w-2/3 mb-3" />
        <div className="flex space-x-4 mb-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="flex space-x-3 mt-4 md:mt-0">
        <Skeleton className="h-10 w-28 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  </div>
);

// Profile Skeleton
export const ProfileSkeleton = () => (
  <div className="max-w-2xl mx-auto p-6">
    <div className="text-center mb-8">
      <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
      <Skeleton className="h-8 w-48 mx-auto mb-2" />
      <Skeleton className="h-4 w-32 mx-auto" />
    </div>
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i}>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      ))}
    </div>
  </div>
);

// Settings Skeleton
export const SettingsSkeleton = () => (
  <div className="max-w-4xl mx-auto p-6">
    <Skeleton className="h-10 w-64 mb-2" />
    <Skeleton className="h-6 w-96 mb-8" />

    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <div className="flex items-center space-x-3 mb-6">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <div>
          <Skeleton className="h-6 w-32 mb-1" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-4">
          <div>
            <Skeleton className="h-5 w-40 mb-1" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-6 w-11 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

// Company Card Skeleton
export const CompanyCardSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 border border-gray-200">
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton className="w-16 h-16 rounded-xl" />
      <div className="flex-1">
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-3/4 mb-4" />
    <div className="flex space-x-2">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
  </div>
);

// Article Card Skeleton
export const ArticleCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
    <Skeleton className="w-full h-48" />
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-3">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-4/5 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-8 w-24 rounded" />
      </div>
    </div>
  </div>
);

// Generic List Skeleton
export const ListSkeleton = ({ count = 5, CardComponent = JobCardSkeleton }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <CardComponent key={index} />
    ))}
  </div>
);

// Grid Skeleton
export const GridSkeleton = ({ count = 6, CardComponent = CompanyCardSkeleton, columns = 3 }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
    {Array.from({ length: count }).map((_, index) => (
      <CardComponent key={index} />
    ))}
  </div>
);

export default Skeleton;
