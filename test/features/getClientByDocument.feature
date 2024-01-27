@getClientById
Feature: Get client by document

  @getClientById
  Scenario: Find client by document
    Given I have a registered client
    When I inform the client document
    Then the client is returned

  @getClientByIdNotFound
  Scenario: Do not find client by document
    Given I have some registered client
    When I inform the wrong client document
    Then the client is not returned
