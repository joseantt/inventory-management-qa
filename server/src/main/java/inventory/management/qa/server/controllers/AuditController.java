package inventory.management.qa.server.controllers;

import inventory.management.qa.server.dtos.PaginatedResponseDTO;
import inventory.management.qa.server.dtos.ProductRevisionResponseDTO;
import inventory.management.qa.server.entities.ProductRevision;
import inventory.management.qa.server.mappers.ProductRevisionMapper;
import inventory.management.qa.server.services.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "DESC") Sort.Direction order) {
        List<ProductRevision> productRevisions = auditService.getAllProductRevisions(page + 1, size,order);

        List<ProductRevisionResponseDTO> productRevisionResponseDTOs = ProductRevisionMapper
                .INSTANCE.toProductRevisionDTOs(productRevisions);

        long totalRevisions = auditService.countProductRevisions();
        int totalPages = (int) Math.ceil((double) totalRevisions / size);

        PaginatedResponseDTO<ProductRevisionResponseDTO> paginatedResponse = new PaginatedResponseDTO<>(
                productRevisionResponseDTOs, page, size, totalRevisions, totalPages);

        return new ResponseEntity<>(paginatedResponse, HttpStatus.OK);
    }
}
