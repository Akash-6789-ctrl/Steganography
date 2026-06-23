package com.steganography.project.controller;

import com.steganography.project.entity.MedicalReport;
import com.steganography.project.service.MedicalReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin
public class MedicalReportController {

    private final MedicalReportService medicalReportService;

    public MedicalReportController(MedicalReportService medicalReportService) {
        this.medicalReportService = medicalReportService;
    }

    @PostMapping("/upload")
    public ResponseEntity<MedicalReport> uploadReport(
            @RequestParam Long patientUserId,
            @RequestParam Long doctorUserId,
            @RequestParam String title,
            @RequestParam("file") MultipartFile file,
            @RequestParam String secretKey) throws IOException {

        MedicalReport saved = medicalReportService.uploadAndEncryptReport(
                patientUserId, doctorUserId, title, file, secretKey);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/patient/{patientUserId}")
    public ResponseEntity<List<MedicalReport>> getReportsForPatient(@PathVariable Long patientUserId) {
        return ResponseEntity.ok(medicalReportService.getReportsForPatient(patientUserId));
    }

    @GetMapping("/{reportId}")
    public ResponseEntity<MedicalReport> getReport(@PathVariable Long reportId) {
        return medicalReportService.findById(reportId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{reportId}/decrypt")
    public ResponseEntity<Map<String, String>> decryptReport(
            @PathVariable Long reportId,
            @RequestParam String secretKey) {
        String content = medicalReportService.decryptReport(reportId, secretKey);
        return ResponseEntity.ok(Map.of("content", content));
    }
}

