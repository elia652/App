package com.billing_app.Billing_App.service.implementation;

import com.billing_app.Billing_App.service.FileServiceUpload;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileUploadImpl implements FileServiceUpload {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    @Override
    public String uploadFile(MultipartFile file) {
        String originalName = file.getOriginalFilename();
        if (originalName == null || !originalName.contains(".")) {
            throw new IllegalArgumentException("Invalid file name: " + originalName);
        }

        String extension = originalName.substring(originalName.lastIndexOf('.') + 1);
        String fileName = UUID.randomUUID() + "." + extension;

        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();

            // Create the directories if they don't exist
            Files.createDirectories(uploadPath);

            Path fullPath = uploadPath.resolve(fileName);

            // Save the file
            file.transferTo(fullPath.toFile());

            return fileName; // Don't return fullPath if exposing server path is unsafe
        } catch (IOException e) {
            throw new RuntimeException("File upload failed: " + e.getMessage(), e);
        }
    }

    @Override
    public boolean deleteFile(String fileName) {
        try {
            Path fullPath = Paths.get(uploadDir).toAbsolutePath().resolve(fileName);
            File file = fullPath.toFile();
            return file.exists() && file.delete();
        } catch (Exception e) {
            return false;
        }
    }
}
