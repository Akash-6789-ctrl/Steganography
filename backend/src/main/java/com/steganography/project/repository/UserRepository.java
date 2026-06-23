package com.steganography.project.repository;

import com.steganography.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    List<User> findByRoleAndApprovedFalse(String role);

    long countByRoleAndApprovedFalse(String role);
}