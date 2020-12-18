package com.library.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Sort;
import org.hibernate.mapping.Map;

@Entity
@Table(name="UserDetails")
public class UserDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="UserId")
	private Long userId;
	@Column(name="password")
	private String password;
	@Column(name="Repassword")
	private String rpassword;
	@Column(name="Name")
	private String name;
	@Column(name="email")
	private String email;
	@Column(name="Major")
	private String Major;
	@Column(name="date")
	private Date date;
	@Column(name="ExpiryDateOfLatestBook")
	private Date expiryDateOfBook;
	
	//@ManyToMany
	//private Collection<NewBook> bookList = new ArrayList();
	@OneToMany
	private Collection<RegisteredBook> registeredBookList = new ArrayList();
	@Column(name="Status")
	private String status;
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getExpiryDateOfBook() {
		return expiryDateOfBook;
	}
	public void setExpiryDateOfBooks(Date expiryDateOfBook) {
		this.expiryDateOfBook = expiryDateOfBook;
	}
	
	public Collection<RegisteredBook> getRegisteredBookList() {
		return registeredBookList;
	}
	public void setRegisteredBookList(Collection<RegisteredBook> registeredBookList) {
		this.registeredBookList = registeredBookList;
	}
	public String getRpassword() {
		return rpassword;
	}
	public void setRpassword(String rpassword) {
		this.rpassword = rpassword;
	}
	/*public Collection<NewBook> getBookList() {
		return bookList;
	}
	public void setBookList(Collection<NewBook> bookList) {
		this.bookList = bookList;
	}*/
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMajor() {
		return Major;
	}
	public void setMajor(String major) {
		Major = major;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}

	
}
