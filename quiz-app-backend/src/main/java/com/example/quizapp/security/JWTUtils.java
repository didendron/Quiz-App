package com.example.quizapp.security;



import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JWTUtils {
	

	@Value("${quiz.app.jwtSecret}")
	private String jwtSecret;

	@Value("${quiz.app.jwtExpirationMs}")
	private int jwtExpirationMs;

	public String generateJwtToken(Authentication authentication) {
		
		

		MyUserPrincipal myUserPrincipal = (MyUserPrincipal) authentication.getPrincipal();

		return Jwts.builder()
				.setSubject((myUserPrincipal.getUsername()))
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.signWith(SignatureAlgorithm.HS512, jwtSecret)
				.compact();
	}

	public String getUserNameFromJwtToken(String token) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException e) {
			System.out.println("Invalid JWT signature");
		} catch (MalformedJwtException e) {
			System.out.println("Invalid JWT token");
			
		} catch (ExpiredJwtException e) {
			System.out.println("JWT token is expired");
			
		} catch (UnsupportedJwtException e) {
			System.out.println("JWT token is unsupported");
			
		} catch (IllegalArgumentException e) {
			System.out.println("JWT claims string is empty");
			
		}

		return false;
	}
}
