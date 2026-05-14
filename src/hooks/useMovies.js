import { useEffect, useRef, useState } from 'react'
import { getMovies } from '../api/moviesApi'

const PAGE_SIZE = 15

export function useMovies() {
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(0)
  const [yearInput, setYearInput] = useState('')
  const [yearFilter, setYearFilter] = useState('')
  const [winnerFilter, setWinnerFilter] = useState('all')
  const debounceRef = useRef(null)
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
    const value = event.target.value
    setYearInput(value)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setYearFilter(value)
      setPage(0)
    }, 500)
  }

  function handleWinnerChange(event) {
    setWinnerFilter(event.target.value)
    setPage(0)
  }

  return {
    movies,
    totalPages,
    page,
    yearInput,
    winnerFilter,
    error,
    setPage,
    handleYearChange,
    handleWinnerChange,
  }
}
