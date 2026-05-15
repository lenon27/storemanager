interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}


export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2
  );

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Paginação">
      
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || disabled}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-surface-border
                   text-slate-400 hover:border-brand-500 hover:text-brand-400
                   disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Página anterior"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

     
      {visiblePages.map((page, idx) => {
        const prev = visiblePages[idx - 1];
        const showEllipsis = prev && page - prev > 1;

        return (
          <span key={page} className="flex items-center gap-1">
            {showEllipsis && (
              <span className="w-9 h-9 flex items-center justify-center text-slate-600">…</span>
            )}
            <button
              onClick={() => onPageChange(page)}
              disabled={disabled}
              className={`
                w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium
                transition-colors border
                ${page === currentPage
                  ? 'bg-brand-600 border-brand-600 text-white'
                  : 'border-surface-border text-slate-400 hover:border-brand-500 hover:text-brand-400'}
                disabled:opacity-40 disabled:cursor-not-allowed
              `}
            >
              {page}
            </button>
          </span>
        );
      })}

     
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || disabled}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-surface-border
                   text-slate-400 hover:border-brand-500 hover:text-brand-400
                   disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Próxima página"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}
