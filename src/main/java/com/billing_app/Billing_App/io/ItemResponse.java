package com.billing_app.Billing_App.io;

import com.billing_app.Billing_App.entity.CategoryEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemResponse {
    private String itemId;
    private String name;
    private BigDecimal price;
    private String description;
    private CategoryEntity categoryName;
    private String categoryId;
    private String imgUrl;
    private Timestamp updatedAt;
    private Timestamp createdAt;
}
