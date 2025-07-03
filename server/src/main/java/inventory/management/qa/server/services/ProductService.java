package inventory.management.qa.server.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import inventory.management.qa.server.entities.Product;
import inventory.management.qa.server.exception.EntityNotFoundException;
import inventory.management.qa.server.repositories.ProductRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {
  private final ProductRepository productRepository;

  public Product create(Product product) {
    return productRepository.save(product);
  }

  public Page<Product> getProducts(Specification<Product> specification, Pageable pageable) {
    if (specification == null) {
      return productRepository.findAll(pageable);
    }

    return productRepository.findAll(specification, pageable);
  }

  public Product findById(Long id) {
    return productRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
  }

  public Product update(Long id, Product product) {
    Product existingProduct = findById(id);

    existingProduct.setName(product.getName());
    existingProduct.setDescription(product.getDescription());
    existingProduct.setCategory(product.getCategory());
    existingProduct.setPrice(product.getPrice());
    existingProduct.setQuantity(product.getQuantity());

    return productRepository.save(existingProduct);
  }

  public Product delete(Long id) {
    Product existingProduct = findById(id);
    productRepository.delete(existingProduct);

    return existingProduct;
  }
}
