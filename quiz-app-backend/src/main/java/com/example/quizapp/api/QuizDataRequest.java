package com.example.quizapp.api;

import java.util.ArrayList;
import java.util.List;

public class QuizDataRequest {
	
	private String quiz;
	private String category;
	private List<QuestionRequest> questions;
	
	public QuizDataRequest() {
		questions=new ArrayList<>();
	}
	
	public String getQuiz() {
		return quiz;
	}
	public void setQuiz(String quiz) {
		this.quiz = quiz;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public List<QuestionRequest> getQuestions() {
		return questions;
	}
	public void setQuestions(List<QuestionRequest> questions) {
		this.questions = questions;
	}
	
	
	

}





