package com.billing_app.Billing_App.service.implementation;

import com.billing_app.Billing_App.entity.CategoryEntity;
import com.billing_app.Billing_App.io.CategoryRequest;
import com.billing_app.Billing_App.io.CategoryResponse;
import com.billing_app.Billing_App.repository.CategoryRepository;
import com.billing_app.Billing_App.repository.ItemRepository;
import com.billing_app.Billing_App.service.CategoryService;
import com.billing_app.Billing_App.service.FileServiceUpload;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final FileServiceUpload fileServiceUpload;
    private final ItemRepository itemRepository;

    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile file) {
       String imgUrl= fileServiceUpload.uploadFile(file);
        CategoryEntity newEntity=convertToEntity(request);
        newEntity.setImgUrl(imgUrl);
        newEntity=categoryRepository.save(newEntity);
        return convertToResponse(newEntity);
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryEntity -> convertToResponse(categoryEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
       CategoryEntity newCategory= categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(()->new RuntimeException("Category not found "+categoryId));
       fileServiceUpload.deleteFile(newCategory.getImgUrl());
       categoryRepository.delete(newCategory);
    }

    private CategoryResponse convertToResponse(CategoryEntity newEntity) {
      Integer itemsCount=  itemRepository.countByCategoryId(newEntity.getId());
        return CategoryResponse.builder()
                .categoryId(newEntity.getCategoryId())
                .bgColor(newEntity.getBgColor())
                .createdAt(newEntity.getCreatedAt())
                .description(newEntity.getDescription())
                .imgUrl(newEntity.getImgUrl())
                .name(newEntity.getName())
                .updatedAt(newEntity.getUpdatedAt())
                .items(itemsCount)
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .bgColor(request.getBgColor())
                .description(request.getDescription())
                .build();
    }
}
