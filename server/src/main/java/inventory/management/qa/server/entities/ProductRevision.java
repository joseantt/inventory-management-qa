package inventory.management.qa.server.entities;

import lombok.Value;

@Value
public class ProductRevision {
    Product product;
    String revType;
    RevisionInfo revisionInfo;
}
