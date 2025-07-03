package inventory.management.qa.server.controllers;

import inventory.management.qa.server.dtos.PaginatedResponseDTO;
import inventory.management.qa.server.dtos.ProductResponseDTO;
import inventory.management.qa.server.dtos.ReducedProductResponseDTO;
import inventory.management.qa.server.entities.Product;
import inventory.management.qa.server.mappers.ProductMapper;
import inventory.management.qa.server.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/integration-api/v1")
@RequiredArgsConstructor
@PreAuthorize("hasRole('admin')")
public class IntegrationApiController {
    private final ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<PaginatedResponseDTO<ReducedProductResponseDTO>>
    getProducts(@PageableDefault(size = 10) Pageable pageable) {
        Page<Product> productPage = productService.getProducts(null, pageable);

        List<ReducedProductResponseDTO> productsResponseDTOs =
                ProductMapper.INSTANCE.productsToReducedProductResponseDTO(productPage.getContent());

        return new ResponseEntity<>(new PaginatedResponseDTO<>(productsResponseDTOs, productPage), HttpStatus.OK);
    }
}
