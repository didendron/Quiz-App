package com.example.quizapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.quizapp.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	Optional<User> findByName(String name);

}
