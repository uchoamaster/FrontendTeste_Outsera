function MovieTable({ movies, yearInput, winnerFilter, onYearChange, onWinnerChange }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>
            Year
            <input
              type="number"
              placeholder="Filter by year"
              value={yearInput}
              onChange={onYearChange}
            />
          </th>
          <th>Title</th>
          <th>
            Winner?
            <select value={winnerFilter} onChange={onWinnerChange}>
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
  )
}

export default MovieTable
