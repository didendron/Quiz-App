package com.example.quizapp.controller;

import java.util.Collections;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.BeanIds;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.quizapp.api.ApiResponse;
import com.example.quizapp.api.CurrentUserResponse;
import com.example.quizapp.api.JwtTokenResponse;
import com.example.quizapp.api.LoginRequest;
import com.example.quizapp.api.SignupRequest;
import com.example.quizapp.api.UserAvailability;
import com.example.quizapp.model.Role;
import com.example.quizapp.model.RoleName;
import com.example.quizapp.model.User;
import com.example.quizapp.repository.RoleRepository;
import com.example.quizapp.repository.UserRepository;
import com.example.quizapp.security.JWTUtils;
import com.example.quizapp.security.MyUserPrincipal;


@CrossOrigin(origins = "http://localhost:3000",allowedHeaders="*")
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
	
	@Autowired
	JWTUtils jwtUtils;

	
	

    @PostMapping(value="/login",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> authenticateUser( @Valid @RequestBody LoginRequest loginRequest
    		,HttpServletRequest request) {
    	

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getName(),
                        loginRequest.getPassword()
                )
        );
        
        SecurityContext securityContext = SecurityContextHolder.getContext();
        securityContext.setAuthentication(authentication);
        
        String jwt = jwtUtils.generateJwtToken(authentication);
       
        
        return ResponseEntity.ok( new JwtTokenResponse(jwt));
    }
	
    @PostMapping(value="/signup",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        
    	if(userRepository.existsByName(signUpRequest.getName())) {
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Nazwa użytkownika już istnieje"));
    	}
    	
    	if(userRepository.existsByPassword(signUpRequest.getPassword())) {
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Hasło już istnieje"));
    	}
    	
        User user = new User(signUpRequest.getName(), signUpRequest.getPassword());

        user.setPassword(user.getPassword());

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Błąd"));

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);
        
        System.out.println(result.getName());


        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Rejestracja przebiegła pomyślnie"));
    }
    
    
    @GetMapping(value="/currentuser")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal MyUserPrincipal principal) {
    	
    		System.out.println(principal.getUsername());
    	    return ResponseEntity.ok(new CurrentUserResponse(principal.getUsername()));
    
    }
    
    @GetMapping(value="/username")
    public ResponseEntity<?> checkNameAvailability(@RequestParam(value="name") String name) {
    	
    	if(userRepository.existsByName(name)) {
    		return ResponseEntity.ok(new UserAvailability(false));
    	}
    	  
    	return ResponseEntity.ok(new UserAvailability(true));
    
    }
    
    @GetMapping(value="/userpassword")
    public ResponseEntity<?> checkPasswordAvailability(@RequestParam(value="password") String password) {
    	
    	ControllerUtils controllerUtils=new ControllerUtils(this.userRepository);
    	
    	
    	if(controllerUtils.checkPassAvailability(password)) {
    		return ResponseEntity.ok(new UserAvailability(false));
    	}
    	  
    	return ResponseEntity.ok(new UserAvailability(true));
    
    }
    
    
    
   
    


}