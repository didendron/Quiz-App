package com.example.quizapp.api;

import java.util.ArrayList;
import java.util.List;

public class QuestionRequest{
	private Question question;
	private List<ChoiceRequest> choices;
	private CorrectChoice correctChoice;
	
	public QuestionRequest() {
		choices=new ArrayList<>();
	}
	
	
	public Question getQuestion() {
		return question;
	}
	public void setQuestion(Question question) {
		this.question = question;
	}
	public List<ChoiceRequest> getChoices() {
		return choices;
	}
	public void setChoices(List<ChoiceRequest> choices) {
		this.choices = choices;
	}
	public CorrectChoice getCorrectChoice() {
		return correctChoice;
	}
	public void setCorrectChoice(CorrectChoice correctChoice) {
		this.correctChoice = correctChoice;
	}

	
	
}
