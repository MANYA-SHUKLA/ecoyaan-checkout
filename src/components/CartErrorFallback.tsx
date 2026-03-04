"use client";

interface CartErrorFallbackProps {
  message?: string;
  onRetry: () => void;
  retryLabel?: string;
}

export function CartErrorFallback({
  message = "Failed to load cart",
  onRetry,
  retryLabel = "Try again",
}: CartErrorFallbackProps) {
  return (
    <div
      className="rounded-2xl border border-red-200/80 bg-red-50/50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/30"
      role="alert"
      aria-live="assertive"
    >
      <p className="font-medium text-red-800 dark:text-red-300">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-xl border border-red-300 bg-white px-5 py-2.5 font-medium text-red-700 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 dark:border-red-700 dark:bg-gray-800 dark:text-red-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900"
        aria-label={retryLabel}
      >
        {retryLabel}
      </button>
    </div>
  );
}
