package inventory.management.qa.server.dtos;

import lombok.Value;

@Value
public class ProductRevisionResponseDTO {
    Long id;
    ProductResponseDTO product;
    String revType;
    Long timestamp;
    String userEmail;
}
