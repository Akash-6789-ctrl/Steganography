package com.steganography.project.controller;

import com.steganography.project.entity.Doctor;
import com.steganography.project.entity.Patient;
import com.steganography.project.entity.User;
import com.steganography.project.repository.DoctorRepository;
import com.steganography.project.repository.PatientRepository;
import com.steganography.project.repository.UserRepository;
import com.steganography.project.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {


    private final UserService userService;
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AuthController(
            UserService userService,
            UserRepository userRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository) {

        this.userService = userService;
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if ("DOCTOR".equalsIgnoreCase(user.getRole())) {
            user.setApproved(false);
        }

        User savedUser = userService.register(user);

        if ("PATIENT".equalsIgnoreCase(savedUser.getRole())) {

            Patient patient = new Patient();
            patient.setUser(savedUser);
            patient.setMedicalId("MID-" + savedUser.getId());

            patientRepository.save(patient);

            return ResponseEntity.ok(
                    Map.of("message", "Registration successful")
            );
        }

        if ("DOCTOR".equalsIgnoreCase(savedUser.getRole())) {

            Doctor doctor = new Doctor();

            doctor.setUser(savedUser);
            doctor.setName(savedUser.getFullName());

            doctor = doctorRepository.save(doctor);

            return ResponseEntity.ok(
                    Map.of(
                            "doctorId", doctor.getId(),
                            "role", "DOCTOR"
                    )
            );
        }

        return ResponseEntity.ok(
                Map.of("message", "Registration successful")
        );
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> payload) {

        String username = payload.get("username");
        String password = payload.get("password");

        Optional<User> userOpt = userService.login(username, password);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).build();
        }

        User user = userOpt.get();

        if ("PATIENT".equalsIgnoreCase(user.getRole())) {

            Patient patient = patientRepository
                    .findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Patient not found"));

            return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "role", user.getRole(),
                    "fullName", user.getFullName(),
                    "patientId", patient.getId()
            ));
        }

        if ("DOCTOR".equalsIgnoreCase(user.getRole())) {

            if (!user.isApproved()) {
                return ResponseEntity.status(403).body(
                        Map.of(
                                "message",
                                "Your account is waiting for admin approval"
                        )
                );
            }

            Doctor doctor = doctorRepository
                    .findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "role", user.getRole(),
                    "fullName", user.getFullName(),
                    "doctorId", doctor.getId()
            ));
        }

        if ("ADMIN".equalsIgnoreCase(user.getRole())) {

            return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "role", user.getRole(),
                    "fullName", user.getFullName()
            ));
        }

        return ResponseEntity.badRequest().body(
                Map.of("message", "Invalid role")
        );
    }
}
