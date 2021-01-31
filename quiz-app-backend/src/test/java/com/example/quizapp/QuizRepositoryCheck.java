package com.example.quizapp;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.example.quizapp.model.Quiz;
import com.example.quizapp.repository.QuizRepository;

@SpringBootTest
public class QuizRepositoryCheck {
	@Autowired
	QuizRepository repository;
	
	@Test
	public void checkFindAll() {
		List<Quiz> quizzes = this.repository.findAll();
		quizzes.forEach(quiz->{
			System.out.println(quiz.getTitle());
		});
		
		quizzes.forEach(quiz->{
			System.out.println(quiz.getCategory().getName());
		});
		
		quizzes.forEach(quiz->{
			quiz.getQuestions().forEach(question->{
				System.out.println(question.getQuestion());
			});;
		});
		
		quizzes.forEach(quiz->{
			quiz.getQuestions().forEach(question->{
				question.getChoices().forEach(choice->{
					System.out.println(choice.getText());
					System.out.println(choice.getIsCorrect());
				});;
			});;
		});
	
	
	}
}
