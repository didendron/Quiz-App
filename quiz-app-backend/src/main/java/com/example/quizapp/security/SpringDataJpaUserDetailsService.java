package com.example.quizapp.security;

import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.quizapp.model.User;
import com.example.quizapp.repository.UserRepository;

@Service
public class SpringDataJpaUserDetailsService implements UserDetailsService {

	private final UserRepository repository;

	@Autowired
	public SpringDataJpaUserDetailsService(UserRepository repository) {
		this.repository = repository;
	}

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = this.repository.findByName(username).orElseThrow(() ->
    	new UsernameNotFoundException("User not found with name : " + username));
		
		
	
	return  new org.springframework.security.core.userdetails.User(user.getName(), user.getPassword(),
			user.getRoles().stream().map(role ->
            new SimpleGrantedAuthority(role.getName().name())
    ).collect(Collectors.toList()));
	}
	

}
