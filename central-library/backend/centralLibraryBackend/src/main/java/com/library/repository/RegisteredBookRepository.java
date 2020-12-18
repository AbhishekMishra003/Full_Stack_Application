package com.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.library.model.RegisteredBook;

@Repository
public interface RegisteredBookRepository extends JpaRepository<RegisteredBook, Long> {

}
