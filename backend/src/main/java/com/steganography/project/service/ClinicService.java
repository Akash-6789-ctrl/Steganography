package com.steganography.project.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.steganography.project.Dto.ClinicDto;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClinicService {

    public List<ClinicDto> searchClinics(String city) {

        List<ClinicDto> clinics = new ArrayList<>();

        try {

            String url =
                    "https://nominatim.openstreetmap.org/search?q=clinic+in+"
                            + city
                            + "&format=json&limit=20";

            RestTemplate restTemplate =
                    new RestTemplate();

            HttpHeaders headers = new HttpHeaders();

            headers.set(
                    "User-Agent",
                    "HospitalManagementSystem/1.0"
            );

            HttpEntity<String> entity =
                    new HttpEntity<>(headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.GET,
                            entity,
                            String.class
                    );

            String body = response.getBody();

            ObjectMapper mapper =
                    new ObjectMapper();

            JsonNode array =
                    mapper.readTree(body);

            for (JsonNode node : array) {

                String name =
                        node.get("display_name")
                                .asText();

                double lat =
                        node.get("lat")
                                .asDouble();

                double lon =
                        node.get("lon")
                                .asDouble();

                clinics.add(
                        new ClinicDto(
                                name,
                                lat,
                                lon
                        )
                );
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return clinics;
    }
}