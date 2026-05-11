import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

vi.mock('./pages/DashboardPage', () => ({
  default: () => <h1>Dashboard Mock</h1>,
}))

vi.mock('./pages/MovieListPage', () => ({
  default: () => <h1>Movies Mock</h1>,
}))

describe('App routes', () => {
  it('renders dashboard route and menu links', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText('Frontend React Test')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'List' })).toBeInTheDocument()
    expect(screen.getByText('Dashboard Mock')).toBeInTheDocument()
  })

  it('renders movies route', () => {
    render(
      <MemoryRouter initialEntries={['/movies']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText('Movies Mock')).toBeInTheDocument()
  })
})
