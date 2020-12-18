package com.library.dao;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.library.exception.ResourceNotFound;
import com.library.model.History;
import com.library.model.NewBook;
import com.library.model.UserDetails;
import com.library.repository.HistoryRepository;
import com.library.repository.NewBookRepository;
import com.library.repository.UserDetailsRepository;

@DataJpaTest
//@AutoConfigureTestDatabase(replace = Replace.NONE)
public class UserDetailsTests {
	
	@Autowired
	private UserDetailsRepository udr;
	
	@Test
	@Rollback(false)
	public void testCreateUser() {
		UserDetails user = new UserDetails();
		user.setUserId((long) 1);
		user.setPassword("Password");
		user.setName("Ganesh");
		user.setEmail("ganesh@gmail.com");
		user.setMajor("civil");
		user.setStatus("active");
		//user.setBookList(newUser.getBookList());
		user.setDate(new Date("23/11/2020"));
		user.setRpassword("Password");
		user.setExpiryDateOfBooks(null);
		
		UserDetails savedUser = udr.save(user);
		assertNotNull(savedUser);
	}
	@Test
	public void testGetUserById() {
		Long userId = (long) 1;
		//Long userIdd = (long) 2;
		UserDetails user = udr.findById(userId).
				orElseThrow(() -> new ResourceNotFound("Not exists"));
		assertEquals(user.getUserId(), userId);
	}
	@Test
	@Rollback(false)
	public void testUpdateUser() {
		Long num = (long) 1;
		UserDetails user = new UserDetails();
		user.setUserId(num);
		user.setPassword("Password");
		user.setName("Ganpati");
		user.setEmail("ganesh@gmail.com");
		user.setMajor("civil");
		user.setStatus("active");
		//user.setBookList(newUser.getBookList());
		user.setDate(new Date("23/11/2020"));
		user.setRpassword("Password");
		user.setExpiryDateOfBooks(null);
		
		UserDetails savedUser = udr.save(user);
		assertEquals(savedUser.getName(),"Ganpati");
	}
	@Test
	public void getAllUsers() {
		List<UserDetails> listUsers = udr.findAll();
		assertThat(listUsers).size().isGreaterThan(0);
	}
	
	@Test
	@Rollback(false)
	public void deleteUser() {
		 Long userId = (long) 1;
		 Boolean existsBeforeDelete = udr.findById(userId).isPresent();
		 udr.deleteById(userId);
		 Boolean notExistsAfterDelete = udr.findById(userId).isPresent();
		 assertTrue(existsBeforeDelete);
		 assertFalse(notExistsAfterDelete);
	}
	
	// Same For books Table And History Table
	@Autowired
	private NewBookRepository nbr;
	
	@Test
	@Rollback(false)
	public void testNewBook() {
		NewBook oldBook = new NewBook();
		oldBook.setId((long) 1);
		oldBook.setTitle("Hypnosism");
		oldBook.setSubject("Phycoanalysis");
		oldBook.setAuthorName("Sigmund Frued");
		oldBook.setPublisherName("Abhishek");
		oldBook.setCopyRight("Sigmund Frued");
		oldBook.setEdition(9);
		oldBook.setNumberOfCopies(200);
		oldBook.setNumberOfPages(1190);
		oldBook.setNumberOfShelf(23);
		oldBook.setISBN(1234);
		oldBook.setNameOfLibrary("central lib");
		oldBook.setSoldCopies(4);
		
		NewBook savedBook = nbr.save(oldBook);
	
		assertNotNull(savedBook);
	}
	@Test
	public void testNewBookById() {
		Long bookId = (long) 1;
		NewBook nb = nbr.findById(bookId).orElseThrow(() -> new ResourceNotFound("Not exists"));
		assertEquals(nb.getBookId(), bookId);
	}
	@Test
	@Rollback(false)
	public void testUpdateNewBook() {
		NewBook oldBook = new NewBook();
		oldBook.setId((long) 1);
		oldBook.setTitle("Hypnosism 1");
		oldBook.setSubject("Phycoanalysis");
		oldBook.setAuthorName("Sigmund Frued");
		oldBook.setPublisherName("Abhishek");
		oldBook.setCopyRight("Sigmund Frued");
		oldBook.setEdition(9);
		oldBook.setNumberOfCopies(200);
		oldBook.setNumberOfPages(1190);
		oldBook.setNumberOfShelf(23);
		oldBook.setISBN(1234);
		oldBook.setNameOfLibrary("central lib");
		oldBook.setSoldCopies(4);
		
		NewBook savedBook = nbr.save(oldBook);
	
		assertEquals(savedBook.getTitle(),"Hypnosism 1");
	}
	@Test
	public void testGetAllbooks() {
		List<NewBook> listBooks = nbr.findAll();
		assertThat(listBooks).size().isGreaterThan(0);
	}
	@Test
	@Rollback(false)
	public void deleteNewBook() {
		 Long bookId = (long) 1;
		 Boolean existsBeforeDelete = nbr.findById(bookId).isPresent();
		 nbr.deleteById(bookId);
		 Boolean notExistsAfterDelete = nbr.findById(bookId).isPresent();
		 assertTrue(existsBeforeDelete);
		 assertFalse(notExistsAfterDelete);
	}
	
	// History and registered book table are controlled by UI, Nothing much to do with Back End so test are not
	// required for them
	
	
	
		
	
}
