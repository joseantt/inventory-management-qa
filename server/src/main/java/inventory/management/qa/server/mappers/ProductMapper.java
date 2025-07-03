package inventory.management.qa.server.mappers;

import java.util.List;

import inventory.management.qa.server.dtos.ReducedProductResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import inventory.management.qa.server.dtos.ProductRequestDTO;
import inventory.management.qa.server.dtos.ProductResponseDTO;
import inventory.management.qa.server.entities.Product;

@Mapper
public interface ProductMapper {
  ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

  Product productRequestDTOToProduct(ProductRequestDTO productRequestDTO);
  ProductResponseDTO productToProductResponseDTO(Product product);

  List<ProductResponseDTO> productsToProductResponseDTOs(List<Product> products);
  List<ReducedProductResponseDTO> productsToReducedProductResponseDTO(List<Product> products);
}