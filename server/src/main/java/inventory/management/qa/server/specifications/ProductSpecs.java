package inventory.management.qa.server.specifications;

import inventory.management.qa.server.entities.Product;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ProductSpecs {
    private ProductSpecs() {}

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
        return (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (searchTerm != null && !searchTerm.isEmpty()) {
                predicates.add(builder.like(builder.lower(root.get("name")),
                        "%" + searchTerm.trim().toLowerCase() + "%"));
            }

            if (category != null && !category.isEmpty()) {
                predicates.add(builder.equal(root.get("category"), category));
            }

            if (minPrice != null && maxPrice != null) {
                predicates.add(builder.between(root.get("price"), minPrice, maxPrice));
            } else if (minPrice != null) {
                predicates.add(builder.greaterThanOrEqualTo(root.get("price"), minPrice));
            } else if (maxPrice != null) {
                predicates.add(builder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            return predicates.isEmpty()
                    ? builder.conjunction()
                    : builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
