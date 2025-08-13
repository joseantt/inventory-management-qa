package inventory.management.qa.server.controllers;

import java.util.List;

import inventory.management.qa.server.dtos.PaginatedResponseDTO;
import inventory.management.qa.server.entities.Product;
import inventory.management.qa.server.specifications.ProductSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;
import inventory.management.qa.server.dtos.ProductRequestDTO;
import inventory.management.qa.server.dtos.ProductResponseDTO;
import inventory.management.qa.server.mappers.ProductMapper;
import inventory.management.qa.server.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/v1/product/")
@RequiredArgsConstructor
public class ProductController {
  private final ProductService productService;

  @GetMapping
  public ResponseEntity<PaginatedResponseDTO<ProductResponseDTO>>
  getAllProducts(@PageableDefault(size = 10, sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable,
                 @RequestParam(required = false) String search,
                 @RequestParam(required = false) String category,
                 @RequestParam(required = false) Double minPrice,
                 @RequestParam(required = false) Double maxPrice) {
    Specification<Product> sp = ProductSpecs.combinedSpecification(search, category, minPrice, maxPrice);

    Page<Product> productPage = productService.getProducts(sp, pageable);

    List<ProductResponseDTO> productsResponseDTOs =
        ProductMapper.INSTANCE.productsToProductResponseDTOs(productPage.getContent());

    return new ResponseEntity<>(new PaginatedResponseDTO<>(productsResponseDTOs, productPage), HttpStatus.OK);
  }

  @GetMapping("{id}")
  public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) {
    ProductResponseDTO productResponseDTO =
        ProductMapper.INSTANCE.productToProductResponseDTO(productService.findById(id));

    return new ResponseEntity<>(productResponseDTO, HttpStatus.OK);
  }

  @PreAuthorize("hasRole('admin') or hasRole('employee')")
  @PostMapping
  public ResponseEntity<ProductResponseDTO> createProduct(@RequestBody @Valid ProductRequestDTO productRequestDTO) {
    ProductResponseDTO productResponseDTO =
        ProductMapper.INSTANCE.productToProductResponseDTO(
            productService.create(ProductMapper.INSTANCE.productRequestDTOToProduct(productRequestDTO)));

    return new ResponseEntity<>(productResponseDTO, HttpStatus.CREATED);
  }

  @PreAuthorize("hasRole('admin') or hasRole('employee')")
  @PatchMapping("/{id}")
  public ResponseEntity<ProductResponseDTO> editProduct(
      @PathVariable Long id, @RequestBody @Valid ProductRequestDTO productRequestDTO) {
    ProductResponseDTO productResponseDTO =
        ProductMapper.INSTANCE.productToProductResponseDTO(
            productService.update(id, ProductMapper.INSTANCE.productRequestDTOToProduct(productRequestDTO)));

    return new ResponseEntity<>(productResponseDTO, HttpStatus.OK);
  }

  @PreAuthorize("hasRole('admin')")
  @DeleteMapping("/{id}")
  public ResponseEntity<ProductResponseDTO> deleteProduct(@PathVariable Long id) {
    ProductResponseDTO productResponseDTO =
        ProductMapper.INSTANCE.productToProductResponseDTO(productService.delete(id));

    return new ResponseEntity<>(productResponseDTO, HttpStatus.NO_CONTENT);
  }
}
