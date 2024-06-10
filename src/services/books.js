import axios from 'axios'

class BookDataService {
  
  getAll (page = 0) {

    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/books?page=${page}`)
  }

  find (query, by = 'title', page = 0) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/books?${by}=${query}&page=${page}`)
  }

  getPoetry (page = 0) { 
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/books/poetry?page=${page}`)
  }

  getFiction (page = 0) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/books/fiction?page=${page}`)
  }

  getMistery (page = 0) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/books/mystery?page=${page}`)
  }

  getHistory (page = 0) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/books/history?page=${page}`)
  }

  getBook (id) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/books/id/${id}`)
  }

  
  


  // getRatings () {
  //   return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/ratings`)
  // }

  // get (id) {
  //   return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/id/${id}`)
  // }
}

export default new BookDataService()