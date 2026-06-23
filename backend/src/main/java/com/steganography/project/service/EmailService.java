package com.steganography.project.service;

import com.steganography.project.Dto.ContactMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendContactMail(ContactMessage contact) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo("akashiever@gmail.com");
        mail.setSubject("MediCare Contact Form: " + contact.getSubject());

        mail.setText(
                "Name: " + contact.getName() + "\n\n" +
                        "Email: " + contact.getEmail() + "\n\n" +
                        "Message:\n" + contact.getMessage()
        );

        mailSender.send(mail);
    }
}