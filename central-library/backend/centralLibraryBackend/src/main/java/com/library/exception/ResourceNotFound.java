package com.library.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class ResourceNotFound extends RuntimeException {
	
	private static final long serialVersionId =1L;
	
	public ResourceNotFound(String message) {
		super(message);
	}

}
