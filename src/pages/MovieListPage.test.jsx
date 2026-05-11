import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MovieListPage from './MovieListPage'
import { getMovies } from '../api/moviesApi'

vi.mock('../api/moviesApi', () => ({
  getMovies: vi.fn(),
}))

describe('MovieListPage', () => {
  beforeEach(() => {
    getMovies.mockImplementation(({ page, year, winner }) =>
      Promise.resolve({
        content: [
          {
            id: page * 100 + 1,
            year: year ?? 1980,
            title: winner === false ? 'Non Winner Movie' : 'Winner Movie',
            winner: winner ?? true,
          },
        ],
        totalPages: 3,
      }),
    )
  })

  it('loads and renders movie rows', async () => {
    render(<MovieListPage />)

    expect(await screen.findByText('Winner Movie')).toBeInTheDocument()
    expect(getMovies).toHaveBeenCalledWith({
      page: 0,
      size: 15,
      year: undefined,
      winner: undefined,
    })
  })

  it('applies year and winner filters', async () => {
    const user = userEvent.setup()
    render(<MovieListPage />)

    const yearInput = await screen.findByPlaceholderText('Filter by year')
    await user.clear(yearInput)
    await user.type(yearInput, '1990')

    await waitFor(() => {
      expect(getMovies).toHaveBeenLastCalledWith({
        page: 0,
        size: 15,
        year: 1990,
        winner: undefined,
      })
    })

    const select = screen.getByDisplayValue('Yes/No')
    await user.selectOptions(select, 'no')

    await waitFor(() => {
      expect(getMovies).toHaveBeenLastCalledWith({
        page: 0,
        size: 15,
        year: 1990,
        winner: false,
      })
    })

    expect(screen.getByText('Non Winner Movie')).toBeInTheDocument()
  })

  it('changes page when pagination is used', async () => {
    const user = userEvent.setup()
    render(<MovieListPage />)

    const nextButton = await screen.findByRole('button', { name: '>' })
    await user.click(nextButton)

    await waitFor(() => {
      expect(getMovies).toHaveBeenLastCalledWith({
        page: 1,
        size: 15,
        year: undefined,
        winner: undefined,
      })
    })
  })
})
