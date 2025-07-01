package inventory.management.qa.server.dtos;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

@Value
public class ProductRequestDTO {
    @NotBlank(message = "Product name is required")
    String name;

    @NotBlank(message = "Product description is required")
    @Size(max = 200, message = "Description cannot exceed 200 characters")
    String description;

    @NotBlank(message = "Product category is required")
    String category;

    @NotNull(message = "Product price is required")
    @DecimalMin(value = "0.0", message = "Price must be greater than 0")
    Double price;

    @NotNull(message = "Product quantity is required")
    @Min(value = 0, message = "Quantity must be greater than or equal to 0")
    Integer quantity;
}
