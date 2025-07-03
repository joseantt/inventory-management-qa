package inventory.management.qa.server.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import inventory.management.qa.server.dtos.ProductRequestDTO;
import inventory.management.qa.server.dtos.ProductResponseDTO;
import inventory.management.qa.server.entities.Product;

@Mapper
public interface ProductMapper {
  ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

  @Mapping(target = "id", ignore = true)
  Product productRequestDTOToProduct(ProductRequestDTO productRequestDTO);
  ProductResponseDTO productToProductResponseDTO(Product product);

  List<ProductResponseDTO> productsToProductResponseDTOs(List<Product> products);
}