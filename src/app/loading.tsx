import { CartPageSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="animate-step-in">
      <CartPageSkeleton />
    </div>
  );
}
