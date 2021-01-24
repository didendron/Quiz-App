package com.example.quizapp;

import java.util.List;

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
	
	//@Test
	void checkName() {
		User user = this.repository.findByName("wersjaj").orElseThrow(() ->
    	new UsernameNotFoundException("Błąd " ));
		System.out.println(user.getName());
		System.out.println(user.getPassword());
	}
	
	@Test
	void checkPassword() {
		List<User> passwordList=this.repository.getPasswords();
		
		for(User user:passwordList) {
			System.out.println(user.getPassword());
		}
	}
	

}
