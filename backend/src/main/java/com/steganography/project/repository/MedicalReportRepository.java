package com.steganography.project.repository;

import com.steganography.project.entity.MedicalReport;
import com.steganography.project.entity.Patient;
import com.steganography.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicalReportRepository extends JpaRepository<MedicalReport, Long> {
    List<MedicalReport> findByPatient(Patient patient);
    List<MedicalReport> findByUploadedBy(User uploadedBy);
}

