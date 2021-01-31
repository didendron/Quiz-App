package com.example.quizapp.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.quizapp.api.ApiResponse;
import com.example.quizapp.api.ChoiceRequest;
import com.example.quizapp.api.CorrectChoice;
import com.example.quizapp.api.QuestionRequest;
import com.example.quizapp.api.QuizDataRequest;
import com.example.quizapp.api.QuizDataResponse;
import com.example.quizapp.model.Category;
import com.example.quizapp.model.Choice;
import com.example.quizapp.model.Question;
import com.example.quizapp.model.Quiz;
import com.example.quizapp.repository.CategoryRepository;
import com.example.quizapp.repository.QuizRepository;

@CrossOrigin(origins = "http://localhost:3000",allowedHeaders="*")
@RestController
@RequestMapping("/api")
public class QuizController {
	
	@Autowired
	QuizRepository quizRepository;
	
	@Autowired
	CategoryRepository categoryRepository;
	
	@PostMapping(value="/createquiz")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> createQuiz(@RequestBody QuizDataRequest quizDataRequest){
		 
		 System.out.println(quizDataRequest.getQuiz()); 
		 System.out.println(quizDataRequest.getCategory());
		 quizDataRequest.getQuestions().forEach(questionRequest->{
			 System.out.println(questionRequest.getQuestion().getText());
		 });
		 
		 quizDataRequest.getQuestions().forEach(questionRequest->{
			 System.out.println(questionRequest.getCorrectChoice().getText());
		 });
		 
		 quizDataRequest.getQuestions().forEach(questionRequest->{
			 questionRequest.getChoices().forEach(choiceRequest->{System.out.println(choiceRequest.getText());});
		 });
		 
		 
		 Quiz quiz=new Quiz(quizDataRequest.getQuiz());
		 Category category;
		 if(!quizDataRequest.getCategory().isEmpty()) {
			category =categoryRepository.findByName(quizDataRequest.getCategory()).orElseThrow(() -> new RuntimeException("Błąd")); 
		 }else {
			category =categoryRepository.findByName("wiedza ogólna").orElseThrow(() -> new RuntimeException("Błąd"));
		 }
		 
		 quiz.setCategory(category);
		 
		 quizDataRequest.getQuestions().forEach(questionRequest->{
			 Question question=new Question(questionRequest.getQuestion().getText());
			 question.setQuiz(quiz);
			 
			 questionRequest.getChoices().forEach(choiceRequest->{
				 Choice choice=new Choice(choiceRequest.getText(),
						 questionRequest.getCorrectChoice().getText().equals(choiceRequest.getText()));
				 choice.setQuestion(question);
				 question.getChoices().add(choice);
			 });
			 
			 
			 quiz.getQuestions().add(question);
				 
		 });
		 
		 quizRepository.save(quiz);
		 
		 return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Rejestracja quizu przebiegła pomyślnie"));
	 }
	
	@GetMapping(value="/getquiz")
	public ResponseEntity<?> getQuiz(){
		
		List<Quiz> quizzes=quizRepository.findAll();
		List<QuizDataRequest> quizzesResponse=new ArrayList<>();
		quizzes.forEach(quiz->{
			QuizDataRequest quizResponse=new QuizDataRequest();
			quizResponse.setQuiz(quiz.getTitle());
			quizResponse.setCategory(quiz.getCategory().getName());
			quiz.getQuestions().forEach(question->{
				QuestionRequest questionResponse=new QuestionRequest();
				com.example.quizapp.api.Question quest=new com.example.quizapp.api.Question();
				quest.setText(question.getQuestion());
				questionResponse.setQuestion(quest);
				CorrectChoice correctChoiceResponse=new CorrectChoice();
				question.getChoices().forEach(choice->{
					ChoiceRequest choiceResponse=new ChoiceRequest();
					choiceResponse.setText(choice.getText());
					if(choice.getIsCorrect()) {
						correctChoiceResponse.setText(choice.getText());
					}
					
					
					questionResponse.getChoices().add(choiceResponse);
				});
				
				
				questionResponse.setCorrectChoice(correctChoiceResponse);
				
				quizResponse.getQuestions().add(questionResponse);
			});
			
			quizzesResponse.add(quizResponse);
		});
		
		
		return ResponseEntity.status(HttpStatus.OK).body(new QuizDataResponse(quizzesResponse));
		
	}

}
