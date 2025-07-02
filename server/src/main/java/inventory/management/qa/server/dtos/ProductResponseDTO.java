package inventory.management.qa.server.dtos;

import lombok.Value;

@Value
public class ProductResponseDTO {
    String name;
    String description;
    String category;
    double price;
    int quantity;
}
