package com.billing_app.Billing_App.service;

import com.billing_app.Billing_App.io.CategoryRequest;
import com.billing_app.Billing_App.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request, MultipartFile file);
    List<CategoryResponse>read();
    void delete(String categoryId);
}
