package com.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.library.model.History;
import com.library.model.NewBook;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
	
	@Query(value = "select h.* from history as h where h.time = 'late'"
			, nativeQuery = true)
	List<History> findAllLateReturns();

}
