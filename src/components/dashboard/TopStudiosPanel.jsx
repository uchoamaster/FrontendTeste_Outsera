function TopStudiosPanel({ studios, loading }) {
  return (
    <article className="panel-card">
      <h2>Top 3 studios with winners</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Win Count</th>
          </tr>
        </thead>
        <tbody>
          {studios.map((studio) => (
            <tr key={studio.name}>
              <td>{studio.name}</td>
              <td>{studio.winCount}</td>
            </tr>
          ))}
          {!studios.length && !loading && (
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

export default TopStudiosPanel
