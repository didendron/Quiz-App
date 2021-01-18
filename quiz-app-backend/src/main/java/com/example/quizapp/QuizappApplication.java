package com.example.quizapp;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class QuizappApplication {

	public static void main(String[] args) {
		new SpringApplicationBuilder(QuizappApplication.class)
		.registerShutdownHook(true)
		.run(args);
	}

}
