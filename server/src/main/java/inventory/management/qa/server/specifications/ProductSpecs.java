package inventory.management.qa.server.specifications;

import inventory.management.qa.server.entities.Product;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecs {
    public static Specification<Product> productBySearchTerm(String searchTerm) {
        return (root, query, builder) -> {
            if (searchTerm == null || searchTerm.isEmpty()) {
                return builder.conjunction();
            }

            return builder.like(builder.lower(root.get("name")), "%" + searchTerm.trim().toLowerCase() + "%");
        };
    }

    public static Specification<Product> productByCategory(String category) {
        return (root, query, builder) -> {
            if (category == null || category.isEmpty()) {
                return builder.conjunction();
            }

            return builder.equal(root.get("category"), category);
        };
    }

    public static Specification<Product> productByPriceRange(Double minPrice, Double maxPrice) {
        return (root, query, builder) -> {
            if (minPrice == null && maxPrice == null) {
                return builder.conjunction();
            }

            if (minPrice != null && maxPrice != null) {
                return builder.between(root.get("price"), minPrice, maxPrice);
            } else if (minPrice != null) {
                return builder.greaterThanOrEqualTo(root.get("price"), minPrice);
            } else {
                return builder.lessThanOrEqualTo(root.get("price"), maxPrice);
            }
        };
    }

    public static Specification<Product> combinedSpecification(String searchTerm, String category, Double minPrice, Double maxPrice) {
        return Specification.allOf(
                productBySearchTerm(searchTerm),
                productByCategory(category),
                productByPriceRange(minPrice, maxPrice)
        );
    }
}
