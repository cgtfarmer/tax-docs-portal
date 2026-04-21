package com.csci.tax_docs_portal.service;

import com.csci.tax_docs_portal.entity.Document;
import com.csci.tax_docs_portal.repository.DocumentRepository;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

@Service
public class DocumentService {

  private final DocumentRepository repository;

  @Autowired
  public DocumentService(DocumentRepository repository) {
    this.repository = repository;
  }

  public Document upload(
      UUID clientId,
      String documentType,
      HttpServletRequest request
  ) throws IOException {
    String storageKey = buildStorageKey(clientId, documentType);

    Path folder = Paths.get("./backend/storage");
    Files.createDirectories(folder);

    Path target = folder.resolve(storageKey);

    Files.copy(
        request.getInputStream(),
        target,
        StandardCopyOption.REPLACE_EXISTING
    );

    Document existing = repository.findByStorageKey(storageKey);

    if (existing == null) {
      Document document = Document.builder()
          .clientId(clientId)
          .storageKey(storageKey)
          .build();

      return repository.create(document);
    }

    return existing;
  }

  public Resource download(UUID id) throws IOException {
    Document document = repository.findById(id);

    Path path = Paths.get("./backend/storage")
        .resolve(document.getStorageKey());

    return new UrlResource(path.toUri());
  }

  public boolean destroy(UUID id) throws IOException {
    Document document = repository.findById(id);

    if (document != null) {
      Path path = Paths.get("./backend/storage")
          .resolve(document.getStorageKey());

      Files.deleteIfExists(path);
    }

    return repository.destroy(id);
  }

  private String buildStorageKey(UUID clientId, String documentType) {
    return switch (documentType.toLowerCase()) {
      case "w4" -> clientId + "-W4.pdf";
      case "1099" -> clientId + "-1099.pdf";
      case "financial statement" -> clientId + "-financial-statement.pdf";
      case "tax forms" -> clientId + "-tax-forms.pdf";
      default -> throw new RuntimeException("Invalid document type");
    };
  }
}
