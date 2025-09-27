const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[var(--color-background)]">
      <div className="flex space-x-2">
        <span className="w-4 h-4 rounded-full animate-bounce bg-[var(--color-blazeOrange-500)] delay-75"></span>
        <span className="w-4 h-4 rounded-full animate-bounce bg-[var(--color-violet-500)] delay-150"></span>
        <span className="w-4 h-4 rounded-full animate-bounce bg-[var(--color-blueGreen-500)] delay-225"></span>
        <span className="w-4 h-4 rounded-full animate-bounce bg-[var(--color-danger-500)] delay-300"></span>
      </div>
    </div>
  );
};

export default Loading;