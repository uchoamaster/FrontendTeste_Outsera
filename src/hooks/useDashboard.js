import { useEffect, useMemo, useState } from 'react'
import {
  getMaxMinWinIntervalForProducers,
  getStudiosWithWinCount,
  getWinnersByYear,
  getYearsWithMultipleWinners,
} from '../api/moviesApi'

export function useDashboard() {
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

  return {
    years,
    topStudios,
    intervals,
    yearQuery,
    winnersByYear,
    loading,
    error,
    setYearQuery,
    handleSearchByYear,
  }
}
