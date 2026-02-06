package com.synchef;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SynChefApplication {

    public static void main(String[] args) {
        SpringApplication.run(SynChefApplication.class, args);
        System.out.println("\n=================================");
        System.out.println("🍳 SynChef Backend is Running!");
        System.out.println("=================================");
        System.out.println("Server: http://localhost:8080");
        System.out.println("=================================\n");
    }
}
