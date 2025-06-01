package com.billing_app.Billing_App.service;

import com.billing_app.Billing_App.io.ItemRequest;
import com.billing_app.Billing_App.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file);
    List<ItemResponse>fetchItems();
    void deleteItems(String itemId);
}
