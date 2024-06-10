import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BookDataService from '../services/books'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './Book.css'
const Book = (props) => {
  let params = useParams()

  const [book, setBook] = useState({
    id: null,
    title: '',
    bookDescription: '',
    image: '',
    star: '',
    price: '',
  })

  useEffect(() => {
    const fetchBook = id => {
      BookDataService.getBook(id)

        .then(response => {
          console.log("response.data: ", response.data)
          setBook({
            id: response.data._id,
            title: response.data.Title,
            bookDescription: response.data.Book_Description,
            image: response.data.Image_Link,
            star: response.data.Stars,
            price: response.data.Price,
          })
        })
        .catch(e => {
          console.log(e)
        })
    }

    fetchBook(params.id)
  }, [params.id])

  const filledStars = [];
  for (let i = 1; i <= 5; i++) {
    filledStars.push(<i key={i} className={`fa fa-star ${i <= book.star ? 'text-warning' : 'text-muted'}`} />);
  }

  const renderStar = () => {
    const stars = "⭐".repeat(book.star);
    return stars; 
  }

  

  return (
   
<Container className="book-intro-container">
      <Row>
        <Col md={4} className="book-image-col">
          <Image src={book.image} alt="Book Cover" fluid />
        </Col>
        <Col md={8} className="book-details-col">
          <h2 className="book-title">{book.title}</h2>
          <div className="book-stars">
            {/* You can use icons or other elements for star ratings */}
            {renderStar()}
          </div>
          <p className="book-price">$ {book.price}</p>
          <p className="book-description">
            {book.bookDescription}
          </p>
        </Col>
      </Row>
    </Container>
 
   
  )
}


export default Book
