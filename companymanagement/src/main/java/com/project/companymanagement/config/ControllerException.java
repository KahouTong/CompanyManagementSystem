package com.project.companymanagement.config;

public class ControllerException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public ControllerException(String url, String message) {
		super(url + "Application" + " controller exception--> " + message);
	}
}
