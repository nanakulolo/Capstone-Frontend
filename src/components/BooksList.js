import React, { useState, useEffect, useCallback } from 'react'
import BookDataService from '../services/books'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import './BooksList.css'
import { BsHeartFill, BsHeart } from 'react-icons/bs'


const BooksList = ({user, likedBooks, addLikedBook, deleteLikedBook}) => {
  const [books, setBooks] = useState([])
  const [searchTitle, setSearchTitle] = useState('')
  const [searchRating, setSearchRating] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [entriesPerPage, setEntriesPerPage] = useState(0)
  const [currentSearchMode, setCurrentSearchMode] = useState('')


  const retrieveBooks = useCallback(() => {
    setCurrentSearchMode('')
    BookDataService.getAll(currentPage)
      .then(response => {
        setBooks(response.data.books)
        setCurrentPage(response.data.page)
        setEntriesPerPage(response.data.entries_per_page)
      })
      .catch(e => {
        console.log("error: " + e)
      })
  }, [currentPage])


  const find = useCallback((query, by) => {
    BookDataService.find(query, by, currentPage)
      .then(response => {
        setBooks(response.data.books)
      })
      .catch(e => {
        console.log(e)
      })
  }, [currentPage])

  const findByTitle = useCallback(() => {
    setCurrentSearchMode('findByTitle')
    console.log("searchTitle: " + searchTitle)
    find(searchTitle, 'title')

  }, [find, searchTitle])

  const findByRating = useCallback(() => {
    setCurrentSearchMode('findByRating')
    if (searchRating === 'All Ratings') {
      retrieveBooks();
    } else {
      find(searchRating, 'rated')
    }
  }, [find, retrieveBooks, searchRating])

  const retrieveNextPage = useCallback(() => {
    if (currentSearchMode === 'findByTitle') {
      findByTitle()
    } else if (currentSearchMode === 'findByRating') {
      findByRating()
    } else {
      retrieveBooks()
    }
  }, [currentSearchMode, findByTitle, findByRating, retrieveBooks])

  // useEffect(() => {
  //   retrieveRatings();
  // }, [retrieveRatings]);

  useEffect(() => {
    setCurrentPage(0)
  }, [currentSearchMode])

  useEffect(() => {
    retrieveNextPage()
  }, [currentPage, retrieveNextPage])

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value
    setSearchTitle(searchTitle)
  }



  return (
    <div className="App">
      <Container className="main-container">
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search By Title (flurry search)"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByTitle} className='testSearch' >
                <span className='ButtonText'>SEARCH</span>
              </Button>

            </Col>
     
          </Row>
        </Form>

        <Row className="bookRow">
          {books.map((book) => {
            return (
              <Col key={book._id}>
                <Card className="booksListCard">
                  {user && (
                    likedBooks.includes(book._id) ?
                    <BsHeartFill className="heart heartFill" onClick={() => { 
                     deleteLikedBook(book._id) }} /> :
                    <BsHeart className="heart heartEmpty" onClick={() => {
                      addLikedBook(book._id) }} />
                  )}
                  <Card.Img
                    className="smallPoster"
                    src={book.Image_Link}
                    onError={({ currentTarget }) => {
                      // currentTarget.onError = null;
                      // currentTarget.src = '/images/fiction1.jpeg';
                    }}
                  />
                  <Card.Body>
                  <Card.Title title={book.Title}>{book.Title.length > 60 ? book.Title.substring(0, 60) + '...' : book.Title}</Card.Title>
                    <Card.Text>
                      <span className='priceText'>${book.Price}</span>
                    </Card.Text>

                    <Link to={'/books/' + book._id}>
                      Details
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
        <br />
        Current Page: {currentPage + 1}
        <Button variant="link" onClick={() => { setCurrentPage(currentPage + 1) }}>
          Get Next {entriesPerPage} Results
        </Button>
      </Container>
    </div>



  )
}

export default BooksList;
