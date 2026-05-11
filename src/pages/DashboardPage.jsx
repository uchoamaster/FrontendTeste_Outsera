import { useEffect, useMemo, useState } from 'react'
import {
  getMaxMinWinIntervalForProducers,
  getStudiosWithWinCount,
  getWinnersByYear,
  getYearsWithMultipleWinners,
} from '../api/moviesApi'

function DashboardPage() {
  const [years, setYears] = useState([])
  const [studios, setStudios] = useState([])
  const [intervals, setIntervals] = useState({ min: [], max: [] })
  const [yearQuery, setYearQuery] = useState('')
  const [winnersByYear, setWinnersByYear] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const topStudios = useMemo(() => studios.slice(0, 3), [studios])

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true)
      setError('')

      try {
        const [yearsData, studiosData, intervalsData] = await Promise.all([
          getYearsWithMultipleWinners(),
          getStudiosWithWinCount(),
          getMaxMinWinIntervalForProducers(),
        ])

        setYears(yearsData.years ?? [])
        setStudios(studiosData.studios ?? [])
        setIntervals({
          min: intervalsData.min ?? [],
          max: intervalsData.max ?? [],
        })
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  async function handleSearchByYear(event) {
    event.preventDefault()

    if (!yearQuery.trim()) {
      setWinnersByYear([])
      return
    }

    try {
      const data = await getWinnersByYear(Number(yearQuery))
      setWinnersByYear(Array.isArray(data) ? data : [])
      setError('')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <section>
      <h1 className="page-title">Dashboard</h1>
      {error && <p className="error-message">Error: {error}</p>}

      <div className="dashboard-grid">
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
              {topStudios.map((studio) => (
                <tr key={studio.name}>
                  <td>{studio.name}</td>
                  <td>{studio.winCount}</td>
                </tr>
              ))}
              {!topStudios.length && !loading && (
                <tr>
                  <td colSpan={2} className="empty-state-cell">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </article>

        <article className="panel-card">
          <h2>Producers with longest and shortest interval between wins</h2>

          <h3>Maximum</h3>
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
              {intervals.max.map((producer) => (
                <tr key={`${producer.producer}-max`}>
                  <td>{producer.producer}</td>
                  <td>{producer.interval}</td>
                  <td>{producer.previousWin}</td>
                  <td>{producer.followingWin}</td>
                </tr>
              ))}
              {!intervals.max.length && !loading && (
                <tr>
                  <td colSpan={4} className="empty-state-cell">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <h3>Minimum</h3>
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
              {intervals.min.map((producer) => (
                <tr key={`${producer.producer}-min`}>
                  <td>{producer.producer}</td>
                  <td>{producer.interval}</td>
                  <td>{producer.previousWin}</td>
                  <td>{producer.followingWin}</td>
                </tr>
              ))}
              {!intervals.min.length && !loading && (
                <tr>
                  <td colSpan={4} className="empty-state-cell">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </article>

        <article className="panel-card">
          <h2>List movie winners by year</h2>
          <form className="search-row" onSubmit={handleSearchByYear}>
            <label htmlFor="year-query" className="sr-only">
              Search by year
            </label>
            <input
              id="year-query"
              type="number"
              placeholder="Search by year"
              value={yearQuery}
              onChange={(event) => setYearQuery(event.target.value)}
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
      </div>
    </section>
  )
}

export default DashboardPage
