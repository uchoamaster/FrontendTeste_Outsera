const API_BASE_URL = 'https://challenge.outsera.tech/api/movies'

function buildUrl(path = '', params = {}) {
  const url = new URL(`${API_BASE_URL}${path}`)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })

  return url
}

async function fetchJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json()
}

export function getMovies({ page = 0, size = 15, year, winner } = {}) {
  const url = buildUrl('', { page, size, year, winner })
  return fetchJson(url)
}

export function getYearsWithMultipleWinners() {
  return fetchJson(buildUrl('/yearsWithMultipleWinners'))
}

export function getStudiosWithWinCount() {
  return fetchJson(buildUrl('/studiosWithWinCount'))
}

export function getMaxMinWinIntervalForProducers() {
  return fetchJson(buildUrl('/maxMinWinIntervalForProducers'))
}

export function getWinnersByYear(year) {
  const url = buildUrl('/winnersByYear', { year })
  return fetchJson(url)
}
