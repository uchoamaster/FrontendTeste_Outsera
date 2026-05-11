import {
  getMaxMinWinIntervalForProducers,
  getMovies,
  getStudiosWithWinCount,
  getWinnersByYear,
  getYearsWithMultipleWinners,
} from './moviesApi'

describe('moviesApi', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ content: [], totalPages: 0 }),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  function fetchedUrl() {
    return global.fetch.mock.calls[0][0].toString()
  }

  it('requests paginated movies with filters', async () => {
    await getMovies({ page: 1, size: 15, year: 1980, winner: true })

    expect(fetchedUrl()).toBe(
      'https://challenge.outsera.tech/api/movies?page=1&size=15&year=1980&winner=true',
    )
  })

  it('requests years with multiple winners endpoint', async () => {
    await getYearsWithMultipleWinners()

    expect(fetchedUrl()).toBe(
      'https://challenge.outsera.tech/api/movies/yearsWithMultipleWinners',
    )
  })

  it('requests studios with win count endpoint', async () => {
    await getStudiosWithWinCount()

    expect(fetchedUrl()).toBe(
      'https://challenge.outsera.tech/api/movies/studiosWithWinCount',
    )
  })

  it('requests max/min interval endpoint', async () => {
    await getMaxMinWinIntervalForProducers()

    expect(fetchedUrl()).toBe(
      'https://challenge.outsera.tech/api/movies/maxMinWinIntervalForProducers',
    )
  })

  it('requests winners by year endpoint', async () => {
    await getWinnersByYear(2018)

    expect(fetchedUrl()).toBe(
      'https://challenge.outsera.tech/api/movies/winnersByYear?year=2018',
    )
  })

  it('throws when request fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 })

    await expect(getMovies()).rejects.toThrow('API request failed with status 500')
  })
})
