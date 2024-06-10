import { render, waitFor, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import mockServer from '../_mocks_/mockServer'
import BooksList from '../components/BooksList'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

test('renders the appropriate number of movie cards', async () => {
  const TITLE_OF_BOOK = 'In a Dark, Dark Wood'
  const BOOK_CARD_CLASS = 'booksListCard'
  const NUMBER_OF_BOOKS = 2

  const { container } = render(<MemoryRouter><BooksList /></MemoryRouter>)
  await waitFor(() => screen.getByText(TITLE_OF_BOOK))
  const bookCards = container.getElementsByClassName(BOOK_CARD_CLASS)
  // screen.debug();
  expect(bookCards.length).toBe(NUMBER_OF_BOOKS)
})