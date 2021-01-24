package com.example.quizapp.controller;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.quizapp.model.User;
import com.example.quizapp.repository.UserRepository;


public class ControllerUtils {

    private final UserRepository userRepository;
	
	public ControllerUtils(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	public boolean checkPassAvailability(String myPass){
		
		boolean result=false;
	
		
		PasswordEncoder passwordEncoder=User.PASSWORD_ENCODER;
		
		List<User> passwordList=this.userRepository.getPasswords();
		
		for(User user:passwordList) {
			
			result=passwordEncoder.matches(myPass, user.getPassword());
			if(result)break;
		}
		
		return result;
	}

}
