package inventory.management.qa.server.controllers;

import inventory.management.qa.server.dtos.PaginatedResponseDTO;
import inventory.management.qa.server.dtos.ProductResponseDTO;
import inventory.management.qa.server.dtos.ProductRevisionResponseDTO;
import inventory.management.qa.server.entities.ProductRevision;
import inventory.management.qa.server.mappers.ProductRevisionMapper;
import inventory.management.qa.server.services.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('admin') or hasRole('employee')")
@RequestMapping("/api/v1/audit")
public class AuditController {

    private final AuditService auditService;

    @GetMapping("/product-revisions")
    public ResponseEntity<PaginatedResponseDTO<ProductRevisionResponseDTO>> getAllProductRevisions(
            @PageableDefault(size = 10) Pageable pageable) {
        List<ProductRevision> productRevisions = auditService.getAllProductRevisions(
                pageable.getPageNumber() + 1,
                pageable.getPageSize()
        );

        List<ProductRevisionResponseDTO> productRevisionResponseDTOs = ProductRevisionMapper
                .INSTANCE.toProductRevisionDTOs(productRevisions);

        long totalRevisions = auditService.countProductRevisions();
        int totalPages = (int) Math.ceil((double) totalRevisions / pageable.getPageSize());
        PaginatedResponseDTO<ProductRevisionResponseDTO> paginatedResponse = new PaginatedResponseDTO<>(
                productRevisionResponseDTOs,
                pageable.getPageNumber(),
                pageable.getPageSize(),
                totalRevisions,
                totalPages
        );

        return new ResponseEntity<>(paginatedResponse, HttpStatus.OK);
    }
}
