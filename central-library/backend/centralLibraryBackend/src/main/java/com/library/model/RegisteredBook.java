package com.library.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RegisteredBook")
public class RegisteredBook {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="RegisteredId")
	private Long registeredId;
	
	@Column(name="UserId")
	private Long userId;

	@Column(name="BooKId")
	private Long bookId;
	
	@Column(name="ExpiryDateOfBook")
	private Date expiryDateOfBook;
	
	public Date getExpiryDateOfBook() {
		return expiryDateOfBook;
	}

	public void setExpiryDateOfBook(Date expiryDateOfBook) {
		this.expiryDateOfBook = expiryDateOfBook;
	}

	public Long getRegisteredId() {
		return registeredId;
	}

	public void setRegisteredId(Long registeredId) {
		this.registeredId = registeredId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getBookId() {
		return bookId;
	}

	public void setBookId(Long bookId) {
		this.bookId = bookId;
	}
	
}
