function WinnersByYearPanel({ yearQuery, winnersByYear, onYearQueryChange, onSearch }) {
  return (
    <article className="panel-card">
      <h2>List movie winners by year</h2>
      <form className="search-row" onSubmit={onSearch}>
        <label htmlFor="year-query" className="sr-only">
          Search by year
        </label>
        <input
          id="year-query"
          type="number"
          placeholder="Search by year"
          value={yearQuery}
          onChange={onYearQueryChange}
        />
        <button type="submit" aria-label="Search year winners">
          Search
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Year</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {winnersByYear.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.year}</td>
              <td>{movie.title}</td>
            </tr>
          ))}
          {!winnersByYear.length && (
            <tr>
              <td colSpan={3} className="empty-state-cell">
                Search a year to list winners
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </article>
  )
}

export default WinnersByYearPanel
