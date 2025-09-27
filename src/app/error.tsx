"use client";
const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[var(--color-background)] text-[var(--color-danger-500)]">
      <svg
        className="w-12 h-12 mb-4 animate-pulse"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-lg font-semibold">{message}</p>
      <p className="text-sm text-[var(--color-gray-400)] mt-1">
        Spróbuj odświeżyć stronę lub wrócić później
      </p>
    </div>
  );
};

export default ErrorMessage;