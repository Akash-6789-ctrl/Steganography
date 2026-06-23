package com.steganography.project.controller;

import java.util.List;

import com.steganography.project.entity.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.steganography.project.service.AppointmentService;
import com.steganography.project.Dto.AppointmentRequest;
import com.steganography.project.entity.Appointment;
import com.steganography.project.repository.AppointmentRepository;


@RestController
@RequestMapping("/appointments")
@CrossOrigin("*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private AppointmentRepository appointmentRepository;


    @PostMapping("/book")
    public Appointment bookAppointment(
            @RequestBody AppointmentRequest request) {

        return appointmentService.bookAppointment(request);
    }

    @PutMapping("/{id}/reject")
    public Appointment rejectAppointment(
            @PathVariable Long id) {

        return appointmentService.rejectAppointment(id);
    }

    @PutMapping("/{id}/cancel")
    public Appointment cancelAppointment(
            @PathVariable Long id) {

        return appointmentService.cancelAppointment(id);
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByPatient(
            @PathVariable Long patientId) {

        return appointmentService.getAppointmentsByPatient(patientId);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctor(
            @PathVariable Long doctorId) {

        return appointmentService.getAppointmentsByDoctor(doctorId);
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<Appointment> approveAppointment(
            @PathVariable Long id) {

        Appointment appointment =
                appointmentRepository.findById(id)
                        .orElseThrow();

        appointment.setStatus("APPROVED");

        String roomName =
                "doctor"
                        + appointment.getDoctor().getId()
                        + "-patient"
                        + appointment.getPatient().getId()
                        + "-appointment"
                        + appointment.getId();

        appointment.setMeetingLink(
                "https://meet.jit.si/" + roomName
        );

        appointmentRepository.save(appointment);

        return ResponseEntity.ok(
                appointmentService.approveAppointment(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAppointment(
            @PathVariable Long id) {

        appointmentService.deleteAppointment(id);

        return ResponseEntity.ok().build();
    }

}

