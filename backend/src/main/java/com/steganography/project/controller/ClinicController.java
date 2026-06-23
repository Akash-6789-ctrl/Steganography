package com.steganography.project.controller;

import com.steganography.project.Dto.ClinicDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.steganography.project.service.ClinicService;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/clinics")
@CrossOrigin(origins = "http://localhost:4200")
public class ClinicController {

    @Autowired
    private ClinicService clinicService;

    @GetMapping("/search")
    public List<ClinicDto> search(
            @RequestParam String city) {

        return clinicService.searchClinics(city);
    }
}