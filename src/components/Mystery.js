import React, { useState, useEffect, useCallback } from 'react';
import BookDataService from '../services/books';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import './BooksList.css';


const Mystery = (props) => {
    const [mystery, setMystery] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);



    const retrieveMystery = useCallback(() => {
        
            BookDataService.getMistery(currentPage)
                .then(response => {
                    setMystery(response.data.mystery);
                    setCurrentPage(response.data.page);
                    setEntriesPerPage(response.data.entries_per_page);
                })
                .catch(e => {
                    console.log("error: " + e);
                });
        },[currentPage]);
        
    useEffect(() => {
        retrieveMystery();
    }, [retrieveMystery, currentPage]);


    return (
        <div className="App">
            <Container className="main-container">
             <Row className="bookRow"> 
                {mystery.map((p) => {
                    return (
                        <Col key={p._id}>
                            <Card className="booksListCard">
                                <Card.Img
                                    className="smallPoster"
                                    src={p.Image_Link}
                                    />
                                

                    <Card.Body>
                    <Card.Title title={p.Title}>{p.Title.length > 60 ? p.Title.substring(0, 60) + '...' : p.Title}</Card.Title>
                    <Card.Text>
                    <span className='priceText'>${p.Price}</span>
                    </Card.Text>

                    <Link to={'/books/' + p._id}>
                      Details
                    </Link>
                    </Card.Body>
                        

                            </Card>
                        </Col>
                    );
                })}
                </Row>
                Current Page: {currentPage + 1}
                <Button variant="link" onClick={
                    () => {
                        setCurrentPage(currentPage + 1);
                    }}>
                    Next Page
                    </Button>
            </Container>
        </div>
    );
};

                     
export default Mystery;



