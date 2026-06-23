package com.steganography.project.controller;

import com.steganography.project.entity.Doctor;
import com.steganography.project.entity.User;
import com.steganography.project.repository.DoctorRepository;
import com.steganography.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/pending-doctors")
    public List<User> getPendingDoctors() {

        return userRepository.findByRoleAndApprovedFalse("DOCTOR");
    }

    @PutMapping("/approve-doctor/{id}")
    public ResponseEntity<?> approveDoctor(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow();

        user.setApproved(true);

        userRepository.save(user);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Doctor approved successfully"
                )
        );
    }
}
