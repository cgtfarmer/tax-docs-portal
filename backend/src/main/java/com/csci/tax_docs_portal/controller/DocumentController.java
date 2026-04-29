package com.csci.tax_docs_portal.controller;

import com.csci.tax_docs_portal.entity.Document;
import com.csci.tax_docs_portal.service.DocumentService;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clients")
@CrossOrigin(origins = "*")
public class DocumentController {

  private final DocumentService service;

  @Autowired
  public DocumentController(DocumentService service) {
    this.service = service;
  }

  @PostMapping("/{clientId}/documents/{documentType}")
  public ResponseEntity<Document> upload(
      @PathVariable UUID clientId,
      @PathVariable String documentType,
      HttpServletRequest request
  ) throws IOException {
    return ResponseEntity.status(201)
        .body(service.upload(clientId, documentType, request));
  }

  @GetMapping("/{clientId}/documents")
  public ResponseEntity<List<Document>> getDocumentsByClient(
      @PathVariable UUID clientId
  ) {
    return ResponseEntity.ok(service.getByClient(clientId));
  }

  @GetMapping("/{clientId}/documents/{documentType}")
  public ResponseEntity<Document> getClientDocument(
      @PathVariable UUID clientId,
      @PathVariable String documentType
  ) {
    return ResponseEntity.ok(service.getClientDocument(clientId, documentType));
  }

  @GetMapping("/documents/{id}/download")
  public ResponseEntity<Resource> download(@PathVariable UUID id)
      throws IOException {
    Resource file = service.download(id);

    return ResponseEntity.ok()
        .header(
            HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename=\"" + file.getFilename() + "\""
        )
        .body(file);
  }

  @DeleteMapping("/documents/{id}")
  public ResponseEntity<Void> destroy(@PathVariable UUID id)
      throws IOException {
    service.destroy(id);

    return ResponseEntity.noContent()
        .build();
  }
}
