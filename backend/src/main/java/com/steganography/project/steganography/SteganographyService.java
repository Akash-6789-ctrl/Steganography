package com.steganography.project.steganography;

import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class SteganographyService {

    private static final String PREFIX = "[[STEGO_START]]";
    private static final String SUFFIX = "[[STEGO_END]]";

    public String encode(String carrierText, String secretData) {
        if (carrierText == null || carrierText.isBlank()) {
            carrierText = "Confidential medical report text.";
        }
        String base64 = Base64.getEncoder().encodeToString(secretData.getBytes(StandardCharsets.UTF_8));
        return carrierText + " " + PREFIX + base64 + SUFFIX;
    }

    public String decode(String stegoText) {
        if (stegoText == null) {
            return "";
        }
        int start = stegoText.indexOf(PREFIX);
        int end = stegoText.indexOf(SUFFIX);
        if (start == -1 || end == -1 || end <= start) {
            return "";
        }
        String base64 = stegoText.substring(start + PREFIX.length(), end);
        byte[] decoded = Base64.getDecoder().decode(base64);
        return new String(decoded, StandardCharsets.UTF_8);
    }
}

