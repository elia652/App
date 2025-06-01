package com.billing_app.Billing_App.service.implementation;

import com.billing_app.Billing_App.entity.CategoryEntity;
import com.billing_app.Billing_App.entity.ItemEntity;
import com.billing_app.Billing_App.io.ItemRequest;
import com.billing_app.Billing_App.io.ItemResponse;
import com.billing_app.Billing_App.repository.CategoryRepository;
import com.billing_app.Billing_App.repository.ItemRepository;
import com.billing_app.Billing_App.service.FileServiceUpload;
import com.billing_app.Billing_App.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final CategoryRepository categoryRepository;
    private final FileServiceUpload fileServiceUpload;
    private final ItemRepository itemRepository;

    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) {
        String imgUrl=fileServiceUpload.uploadFile(file);
        ItemEntity newItem=convertToEntity(request);
        CategoryEntity newCategory=categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(()->new RuntimeException("category not found"+request.getCategoryId()));
        newItem.setCategory(newCategory);
        newItem.setImgUrl(imgUrl);
        newItem=itemRepository.save(newItem);
        return convertToResponse(newItem);
    }

    private ItemEntity convertToEntity(ItemRequest request) {
        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .build();
    }

    private ItemResponse convertToResponse(ItemEntity item) {
        return ItemResponse.builder()
                .itemId(item.getItemId())
                .name(item.getName())
                .price(item.getPrice())
                .description(item.getDescription())
                .categoryId(item.getCategory().getCategoryId())

                .imgUrl(item.getImgUrl())
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .build();
    }


    @Override
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll()
                .stream()
                .map(itemEntity -> convertToResponse(itemEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItems(String itemId) {
       ItemEntity existingItem= itemRepository.findByItemId(itemId)
                .orElseThrow(()->new RuntimeException("Item not found "+itemId));
       boolean isFileDeleted=fileServiceUpload.deleteFile(existingItem.getImgUrl());
       if(isFileDeleted){
           itemRepository.delete(existingItem);
       }else{
           throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"unable to delete image");
       }
    }
}
