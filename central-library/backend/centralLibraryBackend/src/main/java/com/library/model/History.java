package com.library.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "History")
public class History {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="HistoryId")
	private Long historyId;
	
	@Column(name="RegisteredId")
	private Long registeredId;
	
	public Long getRegisteredId() {
		return registeredId;
	}

	public void setRegisteredId(Long registeredId) {
		this.registeredId = registeredId;
	}

	@Column(name="UserId")
	private Long userId;

	@Column(name="BooKId")
	private Long bookId;
	
	@Column(name="ExpiryDateOfBook")
	private Date expiryDateOfBook;
	
	@Column(name="ReturnedDateOfBook")
	private Date returnedDateOfBook;
	
	@Column(name="Bill")
	private int bill;
	
	@Column(name="Time")
	private String time;
	
	@Column(name="ReturnedDayNumber")
	private int returnDay;

	public int getReturnDay() {
		return returnDay;
	}

	public void setReturnDay(int returnDay) {
		this.returnDay = returnDay;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Long getHistoryId() {
		return historyId;
	}

	public void setHistoryId(Long historyId) {
		this.historyId = historyId;
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

	public Date getExpiryDateOfBook() {
		return expiryDateOfBook;
	}

	public void setExpiryDateOfBook(Date expiryDateOfBook) {
		this.expiryDateOfBook = expiryDateOfBook;
	}

	public Date getReturnedDateOfBook() {
		return returnedDateOfBook;
	}

	public void setReturnedDateOfBook(Date returnedDateOfBook) {
		this.returnedDateOfBook = returnedDateOfBook;
	}

	public int getBill() {
		return bill;
	}

	public void setBill(int bill) {
		this.bill = bill;
	}
}
