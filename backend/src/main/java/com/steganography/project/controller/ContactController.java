package com.steganography.project.controller;

import com.steganography.project.Dto.ContactMessage;
import com.steganography.project.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<?> sendMessage(
            @RequestBody ContactMessage message) {

        try {
            emailService.sendContactMail(message);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Message sent successfully");

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            e.printStackTrace();

            Map<String, String> error = new HashMap<>();
            error.put("message", "Server error: " + e.getMessage());

            return ResponseEntity.status(500).body(error);
        }
    }
}