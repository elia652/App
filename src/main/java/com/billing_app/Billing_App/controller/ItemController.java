package com.billing_app.Billing_App.controller;

import com.billing_app.Billing_App.io.ItemRequest;
import com.billing_app.Billing_App.io.ItemResponse;
import com.billing_app.Billing_App.service.ItemService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/admin/items")
    @ResponseStatus(HttpStatus.CREATED)
    public ItemResponse addItems(@RequestPart("file")MultipartFile file,
                                 @RequestPart("item")String request
    ){
        ObjectMapper objectMapper=new ObjectMapper();
        ItemRequest itemRequest=null;
        try{
            itemRequest=objectMapper.readValue(request,ItemRequest.class);
           return itemService.add(itemRequest,file);
        }catch (JsonProcessingException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Error occured during the proccess");
        }
    }
    @GetMapping("/items")
    public List<ItemResponse>readItems(){
       return itemService.fetchItems();
    }



    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/admin/items/{itemId}")
    public void deleteItems(@PathVariable String itemId){
        try{
            itemService.deleteItems(itemId);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"unable to find the item");
        }
    }
}
