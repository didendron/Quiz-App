package com.example.quizapp.api;

import java.util.List;

public class QuizDataResponse {
	private List<QuizDataRequest> quizData;
	
	

	public QuizDataResponse(List<QuizDataRequest> quizData) {
		super();
		this.quizData = quizData;
	}

	public List<QuizDataRequest> getQuizData() {
		return quizData;
	}

	public void setQuizData(List<QuizDataRequest> quizData) {
		this.quizData = quizData;
	}
	
	

}
