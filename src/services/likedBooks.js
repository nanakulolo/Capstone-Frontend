import axios from "axios";


class LikeBooksDataService {
    getFavorites(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/books/likedBooks/${userId}`);
    }

    updateFavorite(_id, favorites) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/books/likedBooks`, 
        { _id, favorites });
    }

    getMyFavorites(userId) {
        console.log("route userID", userId);
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/books/${userId}/myLikedBooks`);
    }

}

export default new LikeBooksDataService();