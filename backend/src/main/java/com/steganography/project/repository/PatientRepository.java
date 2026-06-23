package com.steganography.project.repository;

import com.steganography.project.entity.Patient;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    @Query("select p from Patient p where p.user.id = :userId")
    Optional<Patient> findByUserId(Long userId);
}

