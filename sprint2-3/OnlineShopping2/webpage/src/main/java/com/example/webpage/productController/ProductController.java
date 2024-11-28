package com.example.webpage.productController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.webpage.Product;

@RestController // Ensures this is a REST controller
@RequestMapping("/api/products") // Base path for this controller
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public Page<Product> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id,asc") String sort // Sort parameter
    ) {
        return productService.getAllProducts(PageRequest.of(page, size, parseSortString(sort)));
    }

    // Fetch products filtered by category with optional pagination and sorting
    @GetMapping("/filter")
    public Page<Product> getProductsByCategory(
            @RequestParam String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id,asc") String sort // Sort parameter
    ) {
        return productService.getProductsByCategory(category, PageRequest.of(page, size, parseSortString(sort)));
    }

    // Helper method to parse the sort parameter
    private Sort parseSortString(String sortString) {
        String[] sortParams = sortString.split(",");
        if (sortParams.length == 2) {
            return Sort.by(Sort.Direction.fromString(sortParams[1]), sortParams[0]);
        }
        return Sort.by(Sort.Direction.ASC, sortString);
    }
}