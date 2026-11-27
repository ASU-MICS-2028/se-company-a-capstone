import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('shows the Twɛn name as the page heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Twɛn' })).toBeInTheDocument()
  })
})
