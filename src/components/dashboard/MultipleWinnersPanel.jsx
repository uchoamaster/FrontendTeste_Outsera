function MultipleWinnersPanel({ years, loading }) {
  return (
    <article className="panel-card">
      <h2>List years with multiple winners</h2>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Win Count</th>
          </tr>
        </thead>
        <tbody>
          {years.map((yearResult) => (
            <tr key={yearResult.year}>
              <td>{yearResult.year}</td>
              <td>{yearResult.winnerCount}</td>
            </tr>
          ))}
          {!years.length && !loading && (
            <tr>
              <td colSpan={2} className="empty-state-cell">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </article>
  )
}

export default MultipleWinnersPanel
