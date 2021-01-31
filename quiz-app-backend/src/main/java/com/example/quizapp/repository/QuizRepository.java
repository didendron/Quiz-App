package com.example.quizapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.quizapp.model.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long>{
	
	
	List<Quiz> findAll();
	
}

