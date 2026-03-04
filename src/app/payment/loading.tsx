import { Skeleton } from "@/components/ui/Skeleton";

export default function PaymentLoading() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-stone-200/80 bg-white p-5 md:p-6">
        <Skeleton className="mb-4 h-6 w-36" />
        <hr className="mb-4 border-stone-200" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-2/3" />
      </div>
      <div className="rounded-2xl border border-stone-200/80 bg-white p-5 md:p-6">
        <Skeleton className="mb-4 h-6 w-40" />
        <hr className="mb-4 border-stone-200" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>
    </div>
  );
}
