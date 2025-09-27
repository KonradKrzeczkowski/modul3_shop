import ArrowLeft from "./icons/arrowLeft";
import ArrowRight from "./icons/arrowRight";

type Pagination = {
  page: number;
  pages: number;
};

type PaginationProductProps = {
  pagination: Pagination;
  setPage: (page: number) => void;
};

export default function PaginationProduct({
  pagination,
  setPage,
}: PaginationProductProps) {
  const handlePageChange = (p: number) => setPage(p);
  const handlePrev = () => setPage(Math.max(pagination.page - 1, 1));
  const handleNext = () =>
    setPage(Math.min(pagination.page + 1, pagination.pages));

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6">
      <div className="flex gap-2">
        {(() => {
          const pages: (number | string)[] = [];
          const total = pagination.pages;
          const current = pagination.page;
          const delta = 1;

          const rangeStart = Math.max(current - delta, 2);
          const rangeEnd = Math.min(current + delta, total - 1);

          pages.push(1);
          if (rangeStart > 2) pages.push("...");
          for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
          if (rangeEnd < total - 1) pages.push("...");
          if (total > 1) pages.push(total);

          return pages.map((p, idx) =>
            typeof p === "string" ? (
              <span key={idx} className="px-3 py-1 text-base text-neutral-500">
                {p}
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => handlePageChange(p)}
                className={`px-3 py-1 rounded-[6px] text-base ${
                  current === p
                    ? "bg-primary-500 text-white"
                    : "text-neutral-500"
                }`}
              >
                {p}
              </button>
            )
          );
        })()}
      </div>
      <div className="flex  justify-center gap-2 ">
        <button
          onClick={handlePrev}
          disabled={pagination.page === 1}
          className="px-[20px] py-[10px] border border-neutral-900 rounded-[6px] text-neutral-900 flex gap-[14px] justify-center font-inter"
        >
          <ArrowLeft /> Previous
        </button>
        <button
          onClick={handleNext}
          disabled={pagination.page === pagination.pages}
          className="px-[20px] py-[10px] border border-neutral-900 rounded-[6px] text-neutral-900 flex gap-[14px] justify-center font-inter"
        >
          Next <ArrowRight />
        </button>
      </div>
    </div>
  );
}
