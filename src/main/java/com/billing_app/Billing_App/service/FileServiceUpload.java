package com.billing_app.Billing_App.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileServiceUpload {

    String uploadFile(MultipartFile file);
    boolean deleteFile(String imgUrl);
}
