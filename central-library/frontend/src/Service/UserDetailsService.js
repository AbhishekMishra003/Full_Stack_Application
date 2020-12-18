import axios from 'axios'
const link = "http://localhost:8080/api/u1/users";
const link2 = "http://localhost:8080/api/u1/books";
const link3 = "http://localhost:8080/api/u1/newusers";
const link4 = "http://localhost:8080/api/u1/registeredBook";
const link5 = "http://localhost:8080/api/u1/history";
const link6 = "http://localhost:8080/api/u1/bestBooks";
const link7 = "http://localhost:8080/api/u1/lateHistory";

class UserDetailsService{

    //Best seller category wise books
    getBestSellerBooks(){
        return axios.get(link6);
    }
    // late history
    getLateHistory(){
        return axios.get(link7);
    }
    
    getUser(){
        return axios.get(link);
    }
    createUser(user){
        return axios.post(link, user);
    }
    getUserById(userId){
        return axios.get(link + '/' + userId);
    }
    updateUser(user, userId){
        return axios.put(link + '/'+ userId, user);
    }
    updateUserWithBook(user, userId, bookId){
        return axios.put(link + '/'+ userId + '/' + bookId, user);
    }
    removeBookFromUser(user,userId, registeredId){
        return axios.put(link3 + '/' + userId + '/' + registeredId, user);
    }
    deleteUser(userId){
        return axios.delete(link + '/' + userId);
    }
    getBook(){
        return axios.get(link2);
    }
    createBook(book){
        return axios.post(link2,book);
    }
    getBookById(bookId){
        return axios.get(link2 + '/' + bookId);
    }
    updateBook(newBook, bookId){
        return axios.put(link2 + '/' + bookId, newBook);
    }
    deleteBook(bookId){
        return axios.delete(link2 + '/' + bookId);
    }
    deleteRegisteredBook(registeredId){
        return axios.delete(link4 + '/' + registeredId);
    }
    getHistory(){
        return axios.get(link5);
    }
    getHistoryById(historyId){
        return axios.get(link5 + '/' + historyId);
    }
    createHistory(history){
        return axios.post(link5,history);
    }
}

export default new UserDetailsService()