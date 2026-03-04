"use client";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-shimmer rounded-md bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 bg-[length:200%_100%] dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 ${className}`}
      aria-hidden
    />
  );
}

export function ProductSkeleton() {
  return (
    <li className="grid grid-cols-1 gap-4 rounded-xl border border-stone-200/80 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 md:grid-cols-2 md:items-center">
      <div className="flex gap-4">
        <Skeleton className="h-24 w-24 shrink-0 rounded-lg md:h-20 md:w-20" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-stone-100 pt-3 dark:border-gray-600 md:border-0 md:pt-0">
        <Skeleton className="h-9 w-28 rounded-lg" />
        <Skeleton className="h-5 w-16" />
      </div>
    </li>
  );
}

export function OrderSummarySkeleton() {
  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <Skeleton className="mb-4 h-6 w-32" />
      <div className="space-y-4">
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
      <div className="mt-4 space-y-2 border-t border-stone-200 pt-4 dark:border-gray-600">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
}

export function CartPageSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-stone-200/80 bg-white p-5 dark:border-gray-700 dark:bg-gray-800 md:p-6">
        <Skeleton className="mb-4 h-6 w-28" />
        <ul className="space-y-4">
          <ProductSkeleton />
          <ProductSkeleton />
        </ul>
      </div>
      <div className="rounded-2xl border border-stone-200/80 bg-white p-5 dark:border-gray-700 dark:bg-gray-800 md:p-6 md:sticky md:top-20 md:self-start">
        <Skeleton className="mb-4 h-6 w-32" />
        <hr className="mb-4 border-stone-200 dark:border-gray-600" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="mt-4 h-6 w-20" />
        <Skeleton className="mt-6 h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function CheckoutFormSkeleton() {
  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white p-5 dark:border-gray-700 dark:bg-gray-800 md:p-7">
      <Skeleton className="mb-6 h-6 w-40" />
      <div className="space-y-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
      <div className="mt-6 flex gap-3 border-t border-stone-100 pt-6 dark:border-gray-600">
        <Skeleton className="h-10 w-28 rounded-xl" />
        <Skeleton className="h-10 w-40 rounded-xl" />
      </div>
    </div>
  );
}
