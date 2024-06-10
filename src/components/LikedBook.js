import React from "react";  
import LikeBooksDataService from "../services/likedBooks.js";
import { useEffect, useCallback, useState } from "react";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "./BooksList.css";
import "./LikedBook.css"
import LikedBookDataService from "../services/likedBooks.js";





function LikedBook( { user, deleteLikedBook} ){


    const [myLikedBooksList, setMyLikedBooksList] = useState([]);
    const retrieveMyLikedBooks = useCallback(()=> {
        if (user) {
         LikeBooksDataService.getMyFavorites(user.googleId)
        .then(response => {
          setMyLikedBooksList(response.data);
          console.log(myLikedBooksList)
        })
        .catch(e => {
            console.log(e);
            }
        );
        }
      }, [user])

      useEffect(() => {
        retrieveMyLikedBooks();
        }, [retrieveMyLikedBooks, deleteLikedBook]);

 
    return (
        <Container>
        <div className="book-list">
          {myLikedBooksList.map(book => (
            <div key={book._id} className="book-card">
              <img className="book-image" src={book.Image_Link} alt={book.title} />
              <div className="book-details">
                <h3>{book.Title}</h3>
                <button onClick={() => deleteLikedBook(book._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  }
export default LikedBook;