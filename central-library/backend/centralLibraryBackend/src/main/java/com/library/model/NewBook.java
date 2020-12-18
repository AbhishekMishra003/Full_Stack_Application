package com.library.model;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="Books")
public class NewBook {
	
	public NewBook(){
		
	}
	public NewBook(String subject,String title,String authorName, String publisherName,String CopyRight,int Edition,int numberOfPages,int ISBN,int numberOfCopies, String nameOfLibrary,int numberOfShelf){
		this.subject = subject;
		this.title = title;
		this.authorName = authorName;
		this.publisherName = publisherName;
		this.copyRight= CopyRight;
		this.edition = Edition;
		this.isbn = ISBN;
		this.numberOfPages = numberOfPages;
		this.numberOfCopies = numberOfCopies;
		this.nameOfLibrary= nameOfLibrary;
	}
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="BookId")
	private Long bookId;
	@Column(name="Subject")
	private String subject;
	@Column(name="Title")
	private String title; 
	@Column(name="AuthorName")
	private String authorName;
	@Column(name="PublisherName")
	private String publisherName;
	@Column(name="CopyRight")
	private String copyRight; 
	@Column(name="Edition")
	private int edition;
	@Column(name="Pages")
	private int numberOfPages;
	@Column(name="ISBN")
	private int isbn;
	@Column(name="Copies")
	private int numberOfCopies; 
	@Column(name="libraryName")
	private String nameOfLibrary;
	@Column(name="ShelfNumber")
	private int numberOfShelf;
	@Column(name="SoldCopies")
	private int soldCopies;
	public int getSoldCopies() {
		return soldCopies;
	}
	public void setSoldCopies(int soldCopies) {
		this.soldCopies = soldCopies;
	}
	//@ManyToMany
	//private Collection<UserDetails> user = new ArrayList();
	/*public Collection<UserDetails> getUser() {
		return user;
	}
	public void setUser(Collection<UserDetails> user) {
		this.user = user;
	}*/
	public Long getBookId() {
		return bookId;
	}
	public void setId(Long id) {
		this.bookId = id;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthorName() {
		return authorName;
	}
	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}
	public String getPublisherName() {
		return publisherName;
	}
	public void setPublisherName(String publisherName) {
		this.publisherName = publisherName;
	}
	public String getCopyRight() {
		return copyRight;
	}
	public void setCopyRight(String copyRight) {
		this.copyRight = copyRight;
	}
	public int getEdition() {
		return edition;
	}
	public void setEdition(int edition) {
		this.edition = edition;
	}
	public int getNumberOfPages() {
		return numberOfPages;
	}
	public void setNumberOfPages(int numberOfPages) {
		this.numberOfPages = numberOfPages;
	}
	public int getISBN() {
		return isbn;
	}
	public void setISBN(int isbn) {
		this.isbn = isbn;
	}
	public int getNumberOfCopies() {
		return numberOfCopies;
	}
	public void setNumberOfCopies(int numberOfCopies) {
		this.numberOfCopies = numberOfCopies;
	}
	public String getNameOfLibrary() {
		return nameOfLibrary;
	}
	public void setNameOfLibrary(String nameOfLibrary) {
		this.nameOfLibrary = nameOfLibrary;
	}
	public int getNumberOfShelf() {
		return numberOfShelf;
	}
	public void setNumberOfShelf(int numberOfShelf) {
		this.numberOfShelf = numberOfShelf;
	}

}
