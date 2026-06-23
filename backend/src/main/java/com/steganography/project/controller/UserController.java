package com.steganography.project.controller;

import com.steganography.project.entity.User;
import com.steganography.project.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/by-username/{username}")
    public ResponseEntity<Map<String, Object>> getByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username)
                .map(u -> {
                    Map<String, Object> body = new HashMap<>();
                    body.put("id", u.getId());
                    body.put("username", u.getUsername());
                    body.put("role", u.getRole());
                    body.put("fullName", u.getFullName());
                    return ResponseEntity.ok(body);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

