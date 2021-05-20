package com.project.companymanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {  "com.project.companymanagement.controller","com.project.companymanagement.repository",
        "com.project.companymanagement.entities","com.project.companymanagement.service"})
public class CompanymanagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(CompanymanagementApplication.class, args);
	}

}
