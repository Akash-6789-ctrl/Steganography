package com.steganography.project.controller;

import java.util.List;

import com.steganography.project.entity.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.steganography.project.entity.Doctor;
import com.steganography.project.service.DoctorService;
import com.steganography.project.service.PatientService;
import com.steganography.project.Dto.PatientRequest;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    // CREATE
    @PostMapping
    public Patient createPatient(@RequestBody PatientRequest request) {
        return patientService.createPatient(request);
    }

    // READ ALL
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id,
                                 @RequestBody PatientRequest request) {
        return patientService.updatePatient(id, request);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
    }
}