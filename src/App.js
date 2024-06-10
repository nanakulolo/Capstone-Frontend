import { Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import { Navbar, Nav } from 'react-bootstrap'
import BooksList from './components/BooksList'

import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './components/Login'
import Logout from './components/Logout'
import React, { useState, useEffect, useCallback } from 'react'
import Poetry from './components/Poetry'
import Fiction from './components/Fiction'
import Mystery from './components/Mystery'
import History from './components/History'
import LikeBooksDataService from './services/likedBooks'
import LikedBook from './components/LikedBook'
import Book from './components/Book'


import ContactUs from './components/ContactUs' 
import AnimatedText from './components/GroupLogo'


// import ContactInfo from './components/ContactInfo'

import './App.css'




const ClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID


function App () {
  const [user, setUser] = useState(null)
  const [likedBooks, setLikedBooks] = useState([])

  const fetchLikedBooks = useCallback((userId) => {
    LikeBooksDataService.getFavorites(userId)
    .then(response => {
      console.log(response.data)
      setLikedBooks(response.data.favorites);
    })
    .catch(e => {
      console.log(e);
    });
  }, [])






  const updateLikedBooks = useCallback(async (userId, likedBookList) => {
    return await LikeBooksDataService.updateFavorite(userId, likedBookList)
  }, [])


  const addLikedBook =async (bookId) => {
    const result = await updateLikedBooks(user.googleId, [...likedBooks, bookId])
    if (result.data.status === "success") {
      setLikedBooks([...likedBooks, bookId])
    } else {
      alert("Error adding")
    }
    
  }

  const deleteLikedBook =async (bookId) => {
    const result = await updateLikedBooks(user.googleId, likedBooks.filter((id)=> id !== bookId))
    if (result.data.status === "success") {
    setLikedBooks(likedBooks.filter((id)=> id !== bookId));
  } else {
    alert("Error deleting")
  }
  }

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"))

    if (loginData) {
      let loginExp = loginData.exp
      let now = new Date() / 1000
      if (now < loginExp) {
        // Not expired
        user === null && setUser(loginData)
        fetchLikedBooks(loginData.googleId)

      } else {
        // Expired
        localStorage.setItem("login", null)
      }
    }
  }, [user, fetchLikedBooks])




  return (
    <div className="App">


      <Navbar bg="dark" expand="lg" variant="dark" className="customNavbar">
        <Container className="container-fluid">
          <Navbar.Brand href="/">
        
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">

              <Nav.Link as={Link} to="/books" data-text="All" className="bookslink" style={{ marginLeft: '70px' }}>
                All
              </Nav.Link>
              <Nav.Link as={Link} to="/poetry" className="bookslink" style={{ marginLeft: '50px' }}>
                Poetry
              </Nav.Link>
              <Nav.Link as={Link} to="/fiction" className="bookslink" style={{ marginLeft: '50px' }}>
                Fiction
              </Nav.Link>
              <Nav.Link as={Link} to="/mystery" className="bookslink" style={{ marginLeft: '50px' }}>
                Mystery
              </Nav.Link>
              <Nav.Link as={Link} to="/history" className="bookslink" style={{ marginLeft: '50px' }}>
                History
              </Nav.Link>
              
              { user &&
              <Nav.Link as={Link} to={`/books/${user.googleId}/myLikedBooks`} className="bookslink" style={{ marginLeft: '350px' }}>
                Liked
              </Nav.Link>
}

            </Nav>
          </Navbar.Collapse>
        </Container>




        <div className="google-login">
          <GoogleOAuthProvider clientId={ClientId}>
            {user ? (
              <Logout setUser={setUser} clientId={ClientId} />
            ) : (
              <Login setUser={setUser} />
            )}
          </GoogleOAuthProvider>
        </div>
      </Navbar>




      <Routes>
        <Route exact path="/" element={
          <BooksList
          user ={ user }
          addLikedBook = { addLikedBook }
          deleteLikedBook = { deleteLikedBook }
          likedBooks = { likedBooks }
          />}
        />
        <Route exact path="/books" element={
          <BooksList
          user = { user }
          addLikedBook = { addLikedBook }
          deleteLikedBook = { deleteLikedBook }
          likedBooks = { likedBooks }
          />}
        />
        <Route exact path="/poetry" element={
          <Poetry
          />}
        />
        <Route exact path="/fiction" element={
          <Fiction
          />}
        />
        <Route exact path="/mystery" element={
          <Mystery
          />}
        />
        <Route exact path="/history" element={
          <History
          />}
        />
        <Route path="/books/:id" element={
          <Book
          user = {user}
          />}
          />
        <Route path="/books/:id/myLikedBooks" element={
          <LikedBook
          user = { user }
          deleteLikedBook = { deleteLikedBook }

          />}
          />
      </Routes>


     
      <div className="contact-info">
        <ContactUs />
      </div>



    </div>




  )
}

export default App
