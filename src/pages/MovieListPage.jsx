import { useMovies } from '../hooks/useMovies'
import MovieTable from '../components/movies/MovieTable'
import Pagination from '../components/Pagination'

function MovieListPage() {
  const {
    movies,
    totalPages,
    page,
    yearInput,
    winnerFilter,
    error,
    setPage,
    handleYearChange,
    handleWinnerChange,
  } = useMovies()

  return (
    <section>
      <h1 className="page-title">List movies</h1>
      {error && <p className="error-message">Error: {error}</p>}

      <div className="panel-card full-width-panel">
        <MovieTable
          movies={movies}
          yearInput={yearInput}
          winnerFilter={winnerFilter}
          onYearChange={handleYearChange}
          onWinnerChange={handleWinnerChange}
        />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </section>
  )
}

export default MovieListPage
