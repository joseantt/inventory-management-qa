Feature: CRUD operations on products

  Scenario: Authenticated user creates a product
    Given An user with username "admin@admin.com" and password "admin" is authenticated
    When The user creates a product with the following information:
      | name        | description                   | price  | category    | quantity |
      | Test Product | Description for testing product | 19.99 | ELECTRONICS | 20  |
    Then The product is successfully created
    And The response status code is 201

  Scenario: Authenticated user retrieves a product
    Given An user with username "admin@admin.com" and password "admin" is authenticated
    When The user requests the product by its id
    Then The product details are correctly retrieved
    And The response status code is 200

  Scenario: Authenticated user updates a product
    Given An user with username "admin@admin.com" and password "admin" is authenticated
    When The user updates the created product using the following information:
      | name            | description               | price  | category  | quantity |
      | Updated Product | Updated product description | 29.99 | TOYS      | 15       |
    Then The response status code is 200

  Scenario: Authenticated user retrieves all product
    Given An user with username "admin@admin.com" and password "admin" is authenticated
    When The user requests all products
    Then All products are successfully retrieved
    And The response status code is 200

  Scenario: Authenticated user retrieves products filtered by category
    Given An user with username "admin@admin.com" and password "admin" is authenticated
    When The user retrieves products filtered by category "ELECTRONICS"
    Then The products in the ELECTRONICS category are successfully retrieved
    And The response status code is 200

  Scenario: Authenticated user retrieves products by price range
    Given An user with username "admin@admin.com" and password "admin" is authenticated
    When The user retrieves products with a price range between 10.00 and 30.00
    Then The products within the specified price range are successfully retrieved
    And The response status code is 200

  Scenario: Authenticated user retrieves products by search term
    Given An user with username "admin@admin.com" and password "admin" is authenticated
    When The user retrieves products with the search term "updated product"
    Then The products matching the search term are successfully retrieved
    And The response status code is 200

  Scenario: Authenticated user retrieves products with all filters applied
    Given An user with username "admin@admin.com" and password "admin" is authenticated
    When The user retrieves products with the following filters
      | category    | minPrice | maxPrice | searchTerm       |
      | TOYS        | 10.00    | 35.00    | Updated Product |
    Then The products matching all filters are successfully retrieved
    And The response status code is 200

  Scenario: Unauthenticated user attempts to create a product
    Given An unauthenticated user
    When The user creates a product with the following information:
      | name        | description                   | price  | category    | quantity |
      | Test Product | Description for testing product | 19.99 | ELECTRONICS | 20  |
    Then The response status code is 401

  Scenario: Authenticated user attempts to update a product with invalid data
    Given An user with username "admin@admin.com" and password "admin" is authenticated
    When The user updates the created product using the following information:
      | name            | description                     | price  | category   | quantity |
      | Invalid Product | Invalid description for product | -5.00 | ELECTRONICS | 0        |
    Then The response status code is 400

  Scenario: Unauthenticated user attempts to retrieve all products
    Given An unauthenticated user
    When The user requests all products
    Then All products are successfully retrieved
    And The response status code is 200

  Scenario: Unauthenticated user attempts to retrieve a product
    Given An unauthenticated user
    When The user requests the product by its id
    Then The product details are correctly retrieved
    And The response status code is 200

  Scenario: Authenticated user attempts to delete a product that does not exist
    Given An user with username "admin@admin.com" and password "admin" is authenticated
    When The user attempts to delete a product that does not exist
    Then The response status code is 404

  Scenario: Authenticated user attempts to update a product that does not exist
    Given An user with username "admin@admin.com" and password "admin" is authenticated
    When The user attempts to update a product that does not exist with the following information:
      | name        | description                   | price  | category    | quantity |
      | Nonexistent Product | Description for nonexistent product | 19.99 | ELECTRONICS | 20  |
    Then The response status code is 404

  Scenario: Employee user attempts to delete a product
    Given An user with username "employee@gmail.com" and password "employee" is authenticated
    When The user deletes the created product
    Then The response status code is 403

  Scenario: Authenticated user deletes a product
    Given An user with username "admin@admin.com" and password "admin" is authenticated
    When The user deletes the created product
    Then The response status code is 204
