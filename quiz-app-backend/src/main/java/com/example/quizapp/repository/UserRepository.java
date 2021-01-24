package com.example.quizapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.quizapp.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	Optional<User> findByName(String name);
	
	Boolean existsByName(String name);
	
	Boolean existsByPassword(String password);
	
	@Query("SELECT NEW com.example.quizapp.model.User(u.name,u.password) from User u")
    List<User> getPasswords();

}
