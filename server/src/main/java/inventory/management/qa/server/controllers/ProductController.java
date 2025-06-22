package inventory.management.qa.server.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import inventory.management.qa.server.dtos.ProductRequestDTO;
import inventory.management.qa.server.dtos.ProductResponseDTO;
import inventory.management.qa.server.mappers.ProductMapper;
import inventory.management.qa.server.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/product/")
@RequiredArgsConstructor
public class ProductController {
  private final ProductService productService;

  @GetMapping
  public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
    List<ProductResponseDTO> productsResponseDTOs =
        ProductMapper.INSTANCE.productsToProductResponseDTOs(productService.getAll());

    return new ResponseEntity<>(productsResponseDTOs, HttpStatus.OK);
  }

  @GetMapping("{id}")
  public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) {
    ProductResponseDTO productResponseDTO =
        ProductMapper.INSTANCE.productToProductResponseDTO(productService.findById(id));

    return new ResponseEntity<>(productResponseDTO, HttpStatus.OK);
  }

  @PostMapping()
  public ResponseEntity<ProductResponseDTO> createProduct(@RequestBody @Valid ProductRequestDTO productRequestDTO) {
    ProductResponseDTO productResponseDTO =
        ProductMapper.INSTANCE.productToProductResponseDTO(
            productService.create(ProductMapper.INSTANCE.productRequestDTOToProduct(productRequestDTO)));

    return new ResponseEntity<>(productResponseDTO, HttpStatus.CREATED);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<ProductResponseDTO> editProduct(
      @PathVariable Long id, @RequestBody @Valid ProductRequestDTO productRequestDTO) {
    ProductResponseDTO productResponseDTO =
        ProductMapper.INSTANCE.productToProductResponseDTO(
            productService.update(id, ProductMapper.INSTANCE.productRequestDTOToProduct(productRequestDTO)));

    return new ResponseEntity<>(productResponseDTO, HttpStatus.OK);
  }

  @GetMapping("/delete/{id}")
  public ResponseEntity<ProductResponseDTO> deleteProduct(@PathVariable Long id) {
    ProductResponseDTO productResponseDTO =
        ProductMapper.INSTANCE.productToProductResponseDTO(productService.delete(id));

    return new ResponseEntity<>(productResponseDTO, HttpStatus.OK);
  }
}
