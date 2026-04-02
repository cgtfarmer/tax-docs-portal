package com.csci.tax_docs_portal.service;

import com.csci.tax_docs_portal.entity.Client;
import com.csci.tax_docs_portal.repository.ClientRepository;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ClientService {

  private final ClientRepository clientRepository;

  @Autowired
  public ClientService(ClientRepository clientRepository) {
    this.clientRepository = clientRepository;
  }

  public List<Client> list() {
    log.info("[ClientService#list]");

    return this.clientRepository.findAll();
  }

  public Client get(UUID id) {
    log.info("[ClientService#get] id={}", id);

    return this.clientRepository.findById(id);
  }

  public Client create(Client client) {
    log.info("[ClientService#create] client={}", client);

    Client result = this.clientRepository.create(client);

    return result;
  }

  public Client update(Client client) {
    log.info("[ClientService#update] client={}", client);

    Client result = this.clientRepository.update(client);

    return result;
  }

  public boolean destroy(UUID id) {
    log.info("[ClientService#destroy] id={}", id);

    return this.clientRepository.destroy(id);
  }

  public List<Client> getClientsByAccountant(UUID accountantId) {
    return clientRepository.findByAccountantId(accountantId);
  }

  /*
   * public List<Client> getUnassignedClients() { return
   * clientRepository.findUnassigned(); }
   */
}
