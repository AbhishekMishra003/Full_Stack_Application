package com.library.controller;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.exception.ResourceNotFound;
import com.library.model.History;
import com.library.model.NewBook;
import com.library.model.RegisteredBook;
import com.library.model.UserDetails;
import com.library.repository.HistoryRepository;
import com.library.repository.NewBookRepository;
import com.library.repository.RegisteredBookRepository;
import com.library.repository.UserDetailsRepository;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/u1")
public class UserDetailsController {
	
	@Autowired
	private UserDetailsRepository udr;
	
	@Autowired
	private RegisteredBookRepository rbr;
	// Get all Users
	@GetMapping("/users")
	public List<UserDetails> getAllUser(){
		return udr.findAll();
	}
	// Add user
	@PostMapping("/users")
	public UserDetails createUser(@RequestBody UserDetails userDetails) {
		return udr.save(userDetails);
	}
	// To get the UserDetails by userId
	@GetMapping("/users/{userId}")
	public ResponseEntity<UserDetails> getUserById(@PathVariable Long userId){
		UserDetails user = udr.findById(userId).
				orElseThrow(() -> new ResourceNotFound("Not exists"));
		return ResponseEntity.ok(user);
	}
	// To Update UserDetails
	@PutMapping("/users/{userId}")
	public ResponseEntity<UserDetails> updateUser(@PathVariable Long userId,@RequestBody UserDetails newUser){
		UserDetails user = udr.findById(userId).
				orElseThrow(() -> new ResourceNotFound("Not exists"));
		user.setUserId(newUser.getUserId());
		user.setPassword(newUser.getPassword());
		user.setName(newUser.getName());
		user.setEmail(newUser.getEmail());
		user.setMajor(newUser.getMajor());
		user.setStatus(newUser.getStatus());
		//user.setBookList(newUser.getBookList());
		user.setDate(newUser.getDate());
		user.setRpassword(newUser.getRpassword());
		user.setExpiryDateOfBooks(newUser.getExpiryDateOfBook());
		
		UserDetails updatedUser = udr.save(user);
		
		return ResponseEntity.ok(updatedUser);
	}
	// To Add Books
	@PutMapping("/users/{userId}/{bookId}")
	public ResponseEntity<UserDetails> addBookToUser(@PathVariable Long userId, @PathVariable Long bookId,@RequestBody UserDetails newUser){
		UserDetails oldUser = udr.findById(userId).
				orElseThrow(() -> new ResourceNotFound("Not exists"));
		//NewBook newBook = nbr.findById(bookId).orElseThrow(() -> new ResourceNotFound("Does Not exists"));
		oldUser.setUserId(newUser.getUserId());
		oldUser.setPassword(newUser.getPassword());
		oldUser.setName(newUser.getName());
		oldUser.setEmail(newUser.getEmail());
		oldUser.setMajor(newUser.getMajor());
		oldUser.setStatus(newUser.getStatus());
		//oldUser.setBookList(newUser.getBookList());
		oldUser.setDate(newUser.getDate());
		oldUser.setRpassword(newUser.getRpassword());
		//oldUser.getBookList().add(newBook);
		oldUser.setExpiryDateOfBooks(newUser.getExpiryDateOfBook());
		RegisteredBook rb = new RegisteredBook();
		rb.setUserId(userId); 
		rb.setBookId(bookId);
		rb.setExpiryDateOfBook(newUser.getExpiryDateOfBook());
		oldUser.getRegisteredBookList().add(rb);
		rbr.save(rb);
		UserDetails updatedUser = udr.save(oldUser);
		return ResponseEntity.ok(updatedUser);
	}
	// To delete user
	@DeleteMapping("/users/{userId}")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long userId){
		UserDetails user = udr.findById(userId)
				.orElseThrow(() -> new ResourceNotFound("Not Exists"));
		Map<String, Boolean> response = new HashMap<String, Boolean>();
		udr.delete(user);
		response.put("deleted",Boolean.TRUE);
		return ResponseEntity.ok(response); 
	}
	// Remove issued book from user
	@PutMapping("/newusers/{userId}/{registeredId}")
	public ResponseEntity<UserDetails> deleteUser(@PathVariable Long userId,@PathVariable Long registeredId){
		UserDetails user = udr.findById(userId)
				.orElseThrow(() -> new ResourceNotFound("Not Exists"));
		RegisteredBook rb = rbr.findById(registeredId)
				.orElseThrow(() -> new ResourceNotFound("Not Exists"));
		user.getRegisteredBookList().remove(rb);
		UserDetails updatedUser = udr.save(user);
		return ResponseEntity.ok(updatedUser);
	}
	@Autowired
	private NewBookRepository nbr;
	// Get All books
	@GetMapping("/books")
	public List<NewBook> getAllBooks(){
		return nbr.findAll();
	}
	// Filter best seller categorywise
	@GetMapping("/bestBooks")
	public List<NewBook> findBestSeller(){
		return nbr.findBestSellerCategorywise();
	}
	// Add a book
	@PostMapping("/books")
	public NewBook addBook(@RequestBody NewBook newBook) {
		return nbr.save(newBook);
	}
	// Get Book by Id
	@GetMapping("/books/{bookId}")
	public ResponseEntity<NewBook> getBookById(@PathVariable Long bookId) {
		NewBook newBook = nbr.findById(bookId).orElseThrow(() -> new ResourceNotFound("Not exists"));
		return ResponseEntity.ok(newBook);
	}
	//update Book
	@PutMapping("/books/{bookId}")
	public ResponseEntity<NewBook> updateBook(@PathVariable Long bookId,@RequestBody NewBook newBook){
		NewBook oldBook = nbr.findById(bookId)
				.orElseThrow(() -> new ResourceNotFound("Not exists"));
		oldBook.setTitle(newBook.getTitle());
		oldBook.setSubject(newBook.getSubject());
		oldBook.setAuthorName(newBook.getAuthorName());
		oldBook.setPublisherName(newBook.getPublisherName());
		oldBook.setCopyRight(newBook.getCopyRight());
		oldBook.setEdition(newBook.getEdition());
		oldBook.setNumberOfCopies(newBook.getNumberOfCopies());
		oldBook.setNumberOfPages(newBook.getNumberOfPages());
		oldBook.setNumberOfShelf(newBook.getNumberOfShelf());
		oldBook.setISBN(newBook.getISBN());
		oldBook.setNameOfLibrary(newBook.getNameOfLibrary());
		oldBook.setSoldCopies(newBook.getSoldCopies());
		
		NewBook updatedBook = nbr.save(oldBook);
		return ResponseEntity.ok(updatedBook);
	}
	// Delete a book
	@DeleteMapping("/books/{bookId}")
	public ResponseEntity<Map<String, Boolean>> deleteBook(@PathVariable Long bookId){
		NewBook book = nbr.findById(bookId).orElseThrow(() -> new ResourceNotFound("Not Exists"));
		Map<String, Boolean> bookMap = new HashMap<>();
		nbr.delete(book);
		bookMap.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(bookMap);
	}
	//To see the History of users retrieve all the data from RegisteredBook table
	@GetMapping("/registeredBook")
	public List<RegisteredBook> getRegisteredBook(){
		return rbr.findAll();
	}
	//Get registered Book by it's id
	@GetMapping("/registeredBook/{registeredId}")
	public ResponseEntity<RegisteredBook> getRegisteredBookById(@PathVariable Long registeredId){
		RegisteredBook rb = rbr.findById(registeredId).
				orElseThrow(() -> new ResourceNotFound("Not exists"));
		return ResponseEntity.ok(rb);
	}
	// Delete a registered book(issued book)
	@DeleteMapping("/registeredBook/{registeredId}")
	public ResponseEntity<Map<String, Boolean>> deleteRegisteredBook(@PathVariable Long registeredId){
		RegisteredBook rb = rbr.findById(registeredId).
				orElseThrow(() -> new ResourceNotFound("Not exists"));
		Map<String, Boolean> bookMap = new HashMap<>();
		rbr.delete(rb);
		bookMap.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(bookMap);
	}
	
	@Autowired
	private HistoryRepository hr;
	
	// Get all the data from history table
	@GetMapping("/history")
	public List<History> getAllHistory(){
		return hr.findAll();
	}
	
	// Add History to history table
	@PostMapping("/history")
	public History addHistory(@RequestBody History h) {
		return hr.save(h);
	}
	
	//Get History by id
	@GetMapping("/history/{historyId}")
	public ResponseEntity<History> getHistoryById(@PathVariable Long historyId) {
		History h = hr.findById(historyId).orElseThrow(() -> new ResourceNotFound("Not exists"));
		return ResponseEntity.ok(h);
	}
	// late returns history
	@GetMapping("/lateHistory")
	public List<History> getAllLateHistory(){
		return hr.findAllLateReturns();
	}
	
	
}
