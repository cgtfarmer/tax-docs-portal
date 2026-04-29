package com.csci.tax_docs_portal.service;

import com.csci.tax_docs_portal.entity.Document;
import com.csci.tax_docs_portal.repository.DocumentRepository;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

@Service
public class DocumentService {

  private static final Path STORAGE_DIR = Paths.get("storage");

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
    String extension = getExtensionFromContentType(request.getContentType());

    String storageKey = buildStorageKey(clientId, documentType, extension);

    Files.createDirectories(STORAGE_DIR);

    Path target = STORAGE_DIR.resolve(storageKey);

    Files.copy(
        request.getInputStream(),
        target,
        StandardCopyOption.REPLACE_EXISTING
    );

    Document existing = repository
        .findByStorageKeyPrefix(buildStoragePrefix(clientId, documentType));

    if (existing == null) {
      Document document = Document.builder()
          .clientId(clientId)
          .storageKey(storageKey)
          .build();

      return repository.create(document);
    }

    existing.setStorageKey(storageKey);

    return repository.update(existing);
  }

  public List<Document> getByClient(UUID clientId) {
    return repository.findAllByClientId(clientId);
  }

  public Document getClientDocument(UUID clientId, String documentType) {
    Document document = repository
        .findByStorageKeyPrefix(buildStoragePrefix(clientId, documentType));

    if (document == null) {
      throw new RuntimeException("Document not found");
    }

    return document;
  }

  public Resource download(UUID id) throws IOException {
    Document document = repository.findById(id);

    Path path = STORAGE_DIR.resolve(document.getStorageKey());

    return new UrlResource(path.toUri());
  }

  public boolean destroy(UUID id) throws IOException {
    Document document = repository.findById(id);

    if (document != null) {
      Path path = STORAGE_DIR.resolve(document.getStorageKey());

      Files.deleteIfExists(path);
    }

    return repository.destroy(id);
  }

  private String buildStorageKey(
      UUID clientId,
      String documentType,
      String extension
  ) {
    return switch (documentType.toLowerCase()) {
      case "w4" -> clientId + "-W4" + extension;

      case "1099" -> clientId + "-1099" + extension;

      case "financial statement" ->
        clientId + "-financial-statement" + extension;

      case "tax forms" -> clientId + "-tax-forms" + extension;

      default -> throw new RuntimeException("Invalid document type");
    };
  }

  private String buildStoragePrefix(UUID clientId, String documentType) {
    return switch (documentType.toLowerCase()) {
      case "w4" -> clientId + "-W4";

      case "1099" -> clientId + "-1099";

      case "financial statement" -> clientId + "-financial-statement";

      case "tax forms" -> clientId + "-tax-forms";

      default -> throw new RuntimeException("Invalid document type");
    };
  }

  private String getExtensionFromContentType(String contentType) {

    if (contentType == null) {
      return "";
    }

    return switch (contentType) {
      case "application/pdf" -> ".pdf";

      case "text/plain" -> ".txt";

      case "image/png" -> ".png";

      case "image/jpeg" -> ".jpg";

      case "application/msword" -> ".doc";

      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ->
        ".docx";

      default -> "";
    };
  }
}
