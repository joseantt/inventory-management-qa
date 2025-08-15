package inventory.management.qa.server.mappers;

import inventory.management.qa.server.dtos.ProductRevisionResponseDTO;
import inventory.management.qa.server.entities.ProductRevision;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ProductRevisionMapper {
    ProductRevisionMapper INSTANCE = Mappers.getMapper(ProductRevisionMapper.class);

    @Mapping(source = "revisionInfo.id", target = "id")
    @Mapping(source = "revisionInfo.timestamp", target = "timestamp")
    @Mapping(source = "revisionInfo.userEmail", target = "userEmail")
    ProductRevisionResponseDTO toProductRevisionDTO(ProductRevision revision);

    List<ProductRevisionResponseDTO> toProductRevisionDTOs(List<ProductRevision> revisions);
}