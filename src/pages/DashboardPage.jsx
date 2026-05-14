import { useDashboard } from '../hooks/useDashboard'
import MultipleWinnersPanel from '../components/dashboard/MultipleWinnersPanel'
import TopStudiosPanel from '../components/dashboard/TopStudiosPanel'
import ProducerIntervalsPanel from '../components/dashboard/ProducerIntervalsPanel'
import WinnersByYearPanel from '../components/dashboard/WinnersByYearPanel'

function DashboardPage() {
  const {
    years,
    topStudios,
    intervals,
    yearQuery,
    winnersByYear,
    loading,
    error,
    setYearQuery,
    handleSearchByYear,
  } = useDashboard()

  return (
    <section>
      <h1 className="page-title">Dashboard</h1>
      {error && <p className="error-message">Error: {error}</p>}

      <div className="dashboard-grid">
        <MultipleWinnersPanel years={years} loading={loading} />
        <TopStudiosPanel studios={topStudios} loading={loading} />
        <ProducerIntervalsPanel intervals={intervals} loading={loading} />
        <WinnersByYearPanel
          yearQuery={yearQuery}
          winnersByYear={winnersByYear}
          onYearQueryChange={(event) => setYearQuery(event.target.value)}
          onSearch={handleSearchByYear}
        />
      </div>
    </section>
  )
}

export default DashboardPage
