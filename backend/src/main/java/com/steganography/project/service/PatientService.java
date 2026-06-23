package com.steganography.project.service;

import com.steganography.project.entity.Patient;
import com.steganography.project.entity.User;
import com.steganography.project.repository.PatientRepository;
import com.steganography.project.repository.UserRepository;
import com.steganography.project.Dto.PatientRequest;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public PatientService(PatientRepository patientRepository, UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    // CREATE (you already have this)
    public Patient createPatient(PatientRequest request) {

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setFullName(request.getFullName());
        user.setRole("PATIENT");

        user = userRepository.save(user);

        Patient patient = new Patient();
        patient.setUser(user);
        patient.setMedicalId(request.getMedicalId());

        return patientRepository.save(patient);
    }

    // READ ALL
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // READ BY ID
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    // UPDATE
    public Patient updatePatient(Long id, PatientRequest request) {

        Patient patient = getPatientById(id);
        User user = patient.getUser();

        user.setUsername(request.getUsername());
        user.setFullName(request.getFullName());

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(request.getPassword());
        }

        userRepository.save(user);

        patient.setMedicalId(request.getMedicalId());

        return patientRepository.save(patient);
    }

    // DELETE
    public void deletePatient(Long id) {

        Patient patient = getPatientById(id);

        User user = patient.getUser();

        patientRepository.delete(patient);
        userRepository.delete(user);
    }
}