package inventory.management.qa.server.dtos;

import lombok.Value;

@Value
public class ProductResponseDTO {
    long id;
    String name;
    String description;
    String category;
    double price;
    int quantity;
}
