import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DashboardPage from './DashboardPage'
import {
  getMaxMinWinIntervalForProducers,
  getStudiosWithWinCount,
  getWinnersByYear,
  getYearsWithMultipleWinners,
} from '../api/moviesApi'

vi.mock('../api/moviesApi', () => ({
  getYearsWithMultipleWinners: vi.fn(),
  getStudiosWithWinCount: vi.fn(),
  getMaxMinWinIntervalForProducers: vi.fn(),
  getWinnersByYear: vi.fn(),
}))

describe('DashboardPage', () => {
  beforeEach(() => {
    getYearsWithMultipleWinners.mockResolvedValue({
      years: [{ year: 1986, winnerCount: 2 }],
    })
    getStudiosWithWinCount.mockResolvedValue({
      studios: [
        { name: 'Columbia Pictures', winCount: 7 },
        { name: 'Paramount', winCount: 6 },
        { name: 'Warner Bros', winCount: 5 },
        { name: 'Extra Studio', winCount: 4 },
      ],
    })
    getMaxMinWinIntervalForProducers.mockResolvedValue({
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    })
    getWinnersByYear.mockResolvedValue([
      { id: 1, year: 1980, title: "Can't Stop the Music" },
    ])
  })

  it('renders dashboard summary panels from API data', async () => {
    render(<DashboardPage />)

    expect(await screen.findByText('1986')).toBeInTheDocument()
    expect(screen.getByText('Columbia Pictures')).toBeInTheDocument()
    expect(screen.getByText('Matthew Vaughn')).toBeInTheDocument()
    expect(screen.queryByText('Extra Studio')).not.toBeInTheDocument()
  })

  it('searches winners by year', async () => {
    const user = userEvent.setup()
    render(<DashboardPage />)

    const input = await screen.findByPlaceholderText('Search by year')
    await user.type(input, '1980')
    await user.click(screen.getByRole('button', { name: /search year winners/i }))

    await waitFor(() => {
      expect(getWinnersByYear).toHaveBeenCalledWith(1980)
    })

    expect(screen.getByText("Can't Stop the Music")).toBeInTheDocument()
  })
})
