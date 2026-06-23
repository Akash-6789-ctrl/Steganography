package com.steganography.project.service;

import com.steganography.project.enums.AppointmentStatus;
import com.steganography.project.repository.AppointmentRepository;

import java.util.List;

import com.steganography.project.entity.Patient;
import com.steganography.project.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.steganography.project.Dto.AppointmentRequest;
import com.steganography.project.entity.Appointment;
import com.steganography.project.entity.Doctor;
import com.steganography.project.repository.DoctorRepository;

import java.time.LocalDateTime;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public Appointment bookAppointment(AppointmentRequest request) {

        System.out.println("Patient ID = " + request.getPatientId());

        System.out.println("All Patients = ");
        patientRepository.findAll()
                .forEach(p -> System.out.println(p.getId()));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() ->
                        new RuntimeException("PATIENT NOT FOUND"));

        System.out.println("Patient Found = " + patient.getId());

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() ->
                        new RuntimeException("DOCTOR NOT FOUND"));

        System.out.println("Doctor Found = " + doctor.getId());

        Appointment appointment = new Appointment();

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setStatus("PENDING");
        appointment.setMeetingLink(null);
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setReason(request.getReason());


        appointment.setCreatedAt(LocalDateTime.now());

        return appointmentRepository.save(appointment);
    }

    public Appointment approveAppointment(Long id) {

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

        return appointmentRepository.save(appointment);
    }
    public Appointment rejectAppointment(Long id) {

        Appointment appointment =
                appointmentRepository.findById(id)
                        .orElseThrow();

        appointment.setStatus("REJECTED");

        return appointmentRepository.save(appointment);
    }

    public Appointment cancelAppointment(Long id) {

        Appointment appointment =
                appointmentRepository.findById(id)
                        .orElseThrow();

        appointment.setStatus("CANCELLED");

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointmentsByPatient(Long patientId) {

        return appointmentRepository.findByPatientId(patientId);
    }

    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {

        return appointmentRepository.findByDoctorId(doctorId);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

}
