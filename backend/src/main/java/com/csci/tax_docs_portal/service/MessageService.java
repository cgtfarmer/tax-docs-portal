package com.csci.tax_docs_portal.service;

import com.csci.tax_docs_portal.entity.Message;
import com.csci.tax_docs_portal.repository.MessageRepository;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MessageService {

  private final MessageRepository repository;

  @Autowired
  public MessageService(MessageRepository repository) {
    this.repository = repository;
  }

  public List<Message> list() {
    log.info("[MessageService#list]");
    return repository.findAll();
  }

  public Message get(UUID id) {
    log.info("[MessageService#get] id={}", id);
    return repository.findById(id);
  }

  public List<Message> getConversation(UUID clientId, UUID accountantId) {
    log.info(
        "[MessageService#getConversation] clientId={}, accountantId={}",
        clientId,
        accountantId
    );
    return repository.findByClientAndAccountant(clientId, accountantId);
  }

  public Message create(Message message) {
    log.info("[MessageService#create] message={}", message);
    return repository.create(message);
  }

  public boolean destroy(UUID id) {
    log.info("[MessageService#destroy] id={}", id);
    return repository.destroy(id);
  }
}
