package com.example.quizapp;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.quizapp.model.User;
import com.example.quizapp.repository.UserRepository;

@SpringBootTest
public class UserRepositoryCheck {
	@Autowired
	UserRepository repository;
	
	@Test
	void check() {
		User user = this.repository.findByName("wersjaj").orElseThrow(() ->
    	new UsernameNotFoundException("Błąd " ));
		System.out.println(user.getName());
		System.out.println(user.getPassword());
	}

}
