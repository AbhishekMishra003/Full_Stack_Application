package com.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.library.model.NewBook;

@Repository
public interface NewBookRepository extends JpaRepository<NewBook, Long> {
	
	@Query(value = "select b.*,max(sold_copies) as soldCopies from books as b where b.sold_copies > 0 group by subject"
			, nativeQuery = true)
	List<NewBook> findBestSellerCategorywise();
}
