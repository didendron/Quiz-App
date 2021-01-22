package com.example.quizapp.controller;

import java.net.URI;
import java.util.Collections;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.BeanIds;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.quizapp.api.ApiResponse;
import com.example.quizapp.api.LoginRequest;
import com.example.quizapp.api.SignupRequest;
import com.example.quizapp.model.Role;
import com.example.quizapp.model.RoleName;
import com.example.quizapp.model.User;
import com.example.quizapp.repository.RoleRepository;
import com.example.quizapp.repository.UserRepository;


@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class SecurityController {
	
	@Autowired
    UserRepository userRepository;
	
	@Autowired
    RoleRepository roleRepository;
	
	
	@Autowired
	@Qualifier(BeanIds.AUTHENTICATION_MANAGER)
    AuthenticationManager authenticationManager;
	
	

    @PostMapping(value="/login",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> authenticateUser( @Valid @RequestBody LoginRequest loginRequest) {
    	

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getName(),
                        loginRequest.getPassword()
                )
        );
        
        
    

        SecurityContextHolder.getContext().setAuthentication(authentication);

        
        return ResponseEntity.ok(new ApiResponse(true, "Logowanie przebiegło pomyślnie"));
    }
	
    @PostMapping(value="/signup",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        
        User user = new User(signUpRequest.getName(), signUpRequest.getPassword());

        user.setPassword(user.getPassword());

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Błąd"));

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{name}")
                .buildAndExpand(result.getName()).toUri();
        
    
        
       // HttpHeaders responseHeaders = new HttpHeaders();
       // responseHeaders.setContentType(MediaType.APPLICATION_JSON);
        //responseHeaders.add("Access-Control-Allow-Origin", "*");
        //responseHeaders.add("Access-Control-Allow-Methods", "POST, GET");
        //responseHeaders.add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        
        //return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Rejestracja przebiegła pomyślnie"), responseHeaders, HttpStatus.OK);

        return ResponseEntity.created(location).body(new ApiResponse(true, "Rejestracja przebiegła pomyślnie"));
    }


}
