package com.github.moinmarcell.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FliprNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleFliprNotFoundException(FliprNotFoundException exception){
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("message", exception.getMessage());
        responseBody.put("timestamp", LocalDateTime.now());

        return new ResponseEntity<>(responseBody, HttpStatus.FOUND);
    }

    @ExceptionHandler(FliprUserNotFroundException.class)
    public ResponseEntity<Map<String, Object>> handleFliprUserNotFoundException(FliprUserNotFroundException exception){
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("message", exception.getMessage());
        responseBody.put("timestamp", LocalDateTime.now());

        return new ResponseEntity<>(responseBody, HttpStatus.FOUND);
    }

    @ExceptionHandler(FliprUserAlreadyExistException.class)
    public ResponseEntity<Map<String, Object>> handleFliprUserAlreadyExistException(FliprUserAlreadyExistException exception){
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("message", exception.getMessage());
        responseBody.put("timestamp", LocalDateTime.now());

        return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleAllOtherExceptions(){
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("timestamp", LocalDateTime.now());
        responseBody.put("message", "Sorry! The request could be handled!");
        return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
    }
}
