package com.project.companymanagement.config;

public class GeneralException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;

	public GeneralException(String message) {
		 super("Application" + " GeneralException exception--> " + message);
		 }

}
