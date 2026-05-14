import { useEffect, useState } from 'react'
import { getMovies } from '../api/moviesApi'

const PAGE_SIZE = 15

function MovieListPage() {
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(0)
  const [yearFilter, setYearFilter] = useState('')
  const [winnerFilter, setWinnerFilter] = useState('all')
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadMovies() {
      try {
        const winnerValue =
          winnerFilter === 'all' ? undefined : winnerFilter === 'yes'

        const data = await getMovies({
          page,
          size: PAGE_SIZE,
          year: yearFilter.trim() ? Number(yearFilter) : undefined,
          winner: winnerValue,
        })

        setMovies(data.content ?? [])
        setTotalPages(data.totalPages ?? 0)
        setError('')
      } catch (requestError) {
        setError(requestError.message)
      }
    }

    loadMovies()
  }, [page, winnerFilter, yearFilter])

  function handleYearChange(event) {
    setYearFilter(event.target.value)
    setPage(0)
  }

  function handleWinnerChange(event) {
    setWinnerFilter(event.target.value)
    setPage(0)
  }

  const visiblePages = Array.from({ length: totalPages }, (_, index) => index)

  return (
    <section>
      <h1 className="page-title">List movies</h1>
      {error && <p className="error-message">Error: {error}</p>}

      <div className="panel-card full-width-panel">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>
                Year
                <input
                  type="number"
                  placeholder="Filter by year"
                  value={yearFilter}
                  onChange={handleYearChange}
                />
              </th>
              <th>Title</th>
              <th>
                Winner?
                <select value={winnerFilter} onChange={handleWinnerChange}>
                  <option value="all">Yes/No</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.year}</td>
                <td>{movie.title}</td>
                <td>{movie.winner ? 'Yes' : 'No'}</td>
              </tr>
            ))}
            {!movies.length && (
              <tr>
                <td colSpan={4} className="empty-state-cell">
                  No movies found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination" aria-label="Movie list pagination">
          <button type="button" onClick={() => setPage(0)} disabled={page === 0}>
            {'<<'}
          </button>
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            disabled={page === 0}
          >
            {'<'}
          </button>

          {visiblePages.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              className={pageNumber === page ? 'active-page' : ''}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber + 1}
            </button>
          ))}

          <button
            type="button"
            onClick={() =>
              setPage((current) => Math.min(Math.max(totalPages - 1, 0), current + 1))
            }
            disabled={page >= totalPages - 1 || totalPages === 0}
          >
            {'>'}
          </button>
          <button
            type="button"
            onClick={() => setPage(Math.max(totalPages - 1, 0))}
            disabled={page >= totalPages - 1 || totalPages === 0}
          >
            {'>>'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default MovieListPage
