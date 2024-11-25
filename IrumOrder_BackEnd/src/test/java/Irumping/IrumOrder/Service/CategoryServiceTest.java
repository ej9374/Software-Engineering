package Irumping.IrumOrder.service;

import Irumping.IrumOrder.entity.CategoryEntity;
import Irumping.IrumOrder.repository.JpaMenuCategoryRepository;
import Irumping.IrumOrder.repository.MenuCategoryRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class CategoryServiceTest {

    @Autowired
    CategoryService categoryService;

    @DisplayName("Test createCategory")
    @Test
    void createCategory() {
        // Given
        String categoryName = "testCategory";

        // When
        Long categoryId = categoryService.createCategory(categoryName);

        // Then
        CategoryEntity category = categoryService.findCategoryById(categoryId);
        assertEquals(categoryName, category.getName());

    }

}