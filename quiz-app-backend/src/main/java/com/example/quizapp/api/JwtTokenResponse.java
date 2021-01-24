package com.example.quizapp.api;

public class JwtTokenResponse {
	 private String accessToken;

	public JwtTokenResponse(String accessToken) {
		super();
		this.accessToken = accessToken;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
	 
	 

}
