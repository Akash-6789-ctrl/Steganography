package com.steganography.project.service;

import com.steganography.project.entity.MedicalReport;
import com.steganography.project.entity.Patient;
import com.steganography.project.entity.User;
import com.steganography.project.repository.MedicalReportRepository;
import com.steganography.project.repository.PatientRepository;
import com.steganography.project.repository.UserRepository;
import com.steganography.project.steganography.SteganographyService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@Service
public class MedicalReportService {

    private final MedicalReportRepository medicalReportRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final SteganographyService steganographyService;

    public MedicalReportService(MedicalReportRepository medicalReportRepository,
                                PatientRepository patientRepository,
                                UserRepository userRepository,
                                SteganographyService steganographyService) {
        this.medicalReportRepository = medicalReportRepository;
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
        this.steganographyService = steganographyService;
    }

    public MedicalReport uploadAndEncryptReport(Long patientUserId,
                                                Long doctorUserId,
                                                String title,
                                                MultipartFile file,
                                                String secretKey) throws IOException {

        User doctor = userRepository.findById(doctorUserId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        if (!"DOCTOR".equalsIgnoreCase(doctor.getRole()) && !"ADMIN".equalsIgnoreCase(doctor.getRole())) {
            throw new IllegalArgumentException("Only Doctor/Admin can upload reports");
        }

        User patientUser = userRepository.findById(patientUserId)
                .orElseThrow(() -> new IllegalArgumentException("Patient user not found"));
        if (!"PATIENT".equalsIgnoreCase(patientUser.getRole())) {
            throw new IllegalArgumentException("Selected user is not a Patient");
        }

        // If the patient profile is missing (older registrations), create it automatically.
        Patient patient = patientRepository.findByUserId(patientUser.getId())
                .orElseGet(() -> {
                    Patient p = new Patient();
                    p.setUser(patientUser);
                    p.setMedicalId("MID-" + patientUser.getId());
                    return patientRepository.save(p);
                });

        String fileContent = new String(file.getBytes(), StandardCharsets.UTF_8);
        String combinedSecret = "KEY:" + secretKey + "\n" + fileContent;
        String stegoText = steganographyService.encode("Medical report for " + patientUser.getFullName(), combinedSecret);

        MedicalReport report = new MedicalReport();
        report.setPatient(patient);
        report.setUploadedBy(doctor);
        report.setTitle(title);
        report.setOriginalFilename(file.getOriginalFilename());
        report.setStegoText(stegoText);

        return medicalReportRepository.save(report);
    }

    public Optional<MedicalReport> findById(Long id) {
        return medicalReportRepository.findById(id);
    }

    public List<MedicalReport> getReportsForPatient(Long patientUserId) {
        User patientUser = userRepository.findById(patientUserId)
                .orElseThrow(() -> new IllegalArgumentException("Patient user not found"));
        if (!"PATIENT".equalsIgnoreCase(patientUser.getRole())) {
            throw new IllegalArgumentException("User is not a Patient");
        }

        Patient patient = patientRepository.findByUserId(patientUser.getId())
                .orElseThrow(() -> new IllegalArgumentException("Patient profile not found"));

        return medicalReportRepository.findByPatient(patient);
    }

    public String decryptReport(Long reportId, String secretKey) {
        MedicalReport report = medicalReportRepository.findById(reportId)
                .orElseThrow(() -> new IllegalArgumentException("Report not found"));

        String decoded = steganographyService.decode(report.getStegoText());
        if (!decoded.startsWith("KEY:" + secretKey)) {
            throw new IllegalArgumentException("Invalid secret key");
        }
        return decoded.substring(("KEY:" + secretKey + "\n").length());
    }
}

