package com.steganography.project.controller;

import com.steganography.project.entity.Doctor;
import com.steganography.project.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin("*")
public class DoctorController{

    @Autowired
    private DoctorService doctorService;

    // Get all doctors
    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctor();
    }

    // Get doctor by id
    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id);
    }

    // Create doctor
    @PostMapping
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        return doctorService.createDoctor(doctor);
    }

    // Update doctor
    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable Long id,
            @RequestBody Doctor doctor) {
        return doctorService.updateDoctor(id, doctor);
    }

    // Delete doctor
    @DeleteMapping("/{id}")
    public String deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return "Doctor deleted successfully";
    }

    @GetMapping("/search")
    public List<Doctor> searchDoctors(@RequestParam String query) {
        return doctorService.searchDoctors(query);
    }

    @GetMapping("/video-consult")
    public List<Doctor> getVideoConsultDoctors() {
        return doctorService.getVideoConsultDoctors();
    }
}
