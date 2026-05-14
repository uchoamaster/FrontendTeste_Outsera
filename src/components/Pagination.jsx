function Pagination({ page, totalPages, onPageChange }) {
  const visiblePages = Array.from({ length: totalPages }, (_, index) => index)

  return (
    <div className="pagination" aria-label="Movie list pagination">
      <button type="button" onClick={() => onPageChange(0)} disabled={page === 0}>
        {'<<'}
      </button>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(0, page - 1))}
        disabled={page === 0}
      >
        {'<'}
      </button>

      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={pageNumber === page ? 'active-page' : ''}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber + 1}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(Math.max(totalPages - 1, 0), page + 1))}
        disabled={page >= totalPages - 1 || totalPages === 0}
      >
        {'>'}
      </button>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(totalPages - 1, 0))}
        disabled={page >= totalPages - 1 || totalPages === 0}
      >
        {'>>'}
      </button>
    </div>
  )
}

export default Pagination
