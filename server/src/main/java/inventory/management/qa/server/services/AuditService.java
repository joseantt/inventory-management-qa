package inventory.management.qa.server.services;

import inventory.management.qa.server.entities.ProductRevision;
import inventory.management.qa.server.entities.Product;
import inventory.management.qa.server.entities.RevisionInfo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.hibernate.envers.AuditReader;
import org.hibernate.envers.AuditReaderFactory;
import org.hibernate.envers.RevisionType;
import org.hibernate.envers.query.AuditEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditService {
    @PersistenceContext
    private EntityManager entityManager;

    public List<ProductRevision> getAllProductRevisions(int pageNumber, int pageSize) {
        AuditReader auditReader = AuditReaderFactory.get(entityManager);

        List<Object[]> revisionList = auditReader.createQuery()
                .forRevisionsOfEntity(Product.class, false, true)
                .setFirstResult((pageNumber - 1) * pageSize)
                .setMaxResults(pageSize)
                .getResultList();

        return revisionList.stream().map(
            revision -> {
                Product product = (Product) revision[0];
                RevisionInfo revisionInfo = (RevisionInfo) revision[1];
                String revType = ((RevisionType) revision[2]).name();

                return new ProductRevision(
                        product,
                        revType,
                        revisionInfo
                );
            }
        ).toList();
    }

    public long countProductRevisions() {
        AuditReader auditReader = AuditReaderFactory.get(entityManager);

        Number count = (Number) auditReader.createQuery()
                .forRevisionsOfEntity(Product.class, false, true)
                .addProjection(AuditEntity.revisionNumber().count())
                .getSingleResult();

        return count.longValue();
    }
}
