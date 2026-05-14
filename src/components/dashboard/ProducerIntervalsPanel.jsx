function ProducerIntervalTable({ producers, loading, label }) {
  return (
    <>
      <h3>{label}</h3>
      <table>
        <thead>
          <tr>
            <th>Producer</th>
            <th>Interval</th>
            <th>Previous Year</th>
            <th>Following Year</th>
          </tr>
        </thead>
        <tbody>
          {producers.map((producer) => (
            <tr key={`${producer.producer}-${label}`}>
              <td>{producer.producer}</td>
              <td>{producer.interval}</td>
              <td>{producer.previousWin}</td>
              <td>{producer.followingWin}</td>
            </tr>
          ))}
          {!producers.length && !loading && (
            <tr>
              <td colSpan={4} className="empty-state-cell">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

function ProducerIntervalsPanel({ intervals, loading }) {
  return (
    <article className="panel-card">
      <h2>Producers with longest and shortest interval between wins</h2>
      <ProducerIntervalTable producers={intervals.max} loading={loading} label="Maximum" />
      <ProducerIntervalTable producers={intervals.min} loading={loading} label="Minimum" />
    </article>
  )
}

export default ProducerIntervalsPanel
