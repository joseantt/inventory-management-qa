package inventory.management.qa.server.steps;

import inventory.management.qa.server.dtos.ProductRequestDTO;
import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Map;
import java.util.List;

@CucumberContextConfiguration
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProductSteps {

    private String token;
    private final TestRestTemplate restTemplate;

    private ResponseEntity<Map<String, Object>> response;
    private static long createdProductId;
    private String searchTerm;
    private static double minPrice;
    private static double maxPrice;

    public ProductSteps(TestRestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Given("An user with username {string} and password {string} is authenticated")
    public void aUserWithUsernameAndPasswordIsAuthenticated(String username, String password) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        String clientId = "inventory-frontend";
        map.add("client_id", clientId);
        map.add("grant_type", "password");
        map.add("username", username);
        map.add("password", password);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        String keyCloakUrl = "http://localhost:7080/realms/inventory-realm/protocol/openid-connect/token";
        this.response = restTemplate.exchange(
                keyCloakUrl,
                HttpMethod.POST,
                request,
                new ParameterizedTypeReference<>() {}
        );

        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RuntimeException("Authentication failed: " + response.getStatusCode());
        }

        token = (String) response.getBody().get("access_token");
    }

    @When("The user creates a product with the following information:")
    public void theUserCreatesAProductWithTheFollowingInformation(DataTable dataTable) {
        List<Map<String, String>> rows = dataTable.asMaps();
        Map<String, String> productData = rows.getFirst();
        ProductRequestDTO productRequest = buildProductRequest(productData);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        HttpEntity<ProductRequestDTO> request = new HttpEntity<>(productRequest, headers);

        this.response = restTemplate.exchange(
                "/api/v1/product/",
                HttpMethod.POST,
                request,
                new ParameterizedTypeReference<>() {}
        );
    }

    @Then("The product is successfully created")
    public void theProductIsSuccessfullyCreated() {
        if (response == null || !response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Product creation failed: " + (response != null ? response.getStatusCode() : "No response"));
        }

        Map<String, Object> body = response.getBody();
        if (body == null || response.getBody().get("name").equals("")) {
            throw new RuntimeException("Product creation response does not contain an ID");
        }

        createdProductId = ((Integer) body.get("id")).longValue();
    }

    @And("The response status code is {int}")
    public void theResponseStatusCodeIs(int statusCode) {
        if (response == null || response.getStatusCode() != HttpStatus.valueOf(statusCode)) {
            throw new RuntimeException("Expected status code " + statusCode + " but got " + (response != null ? response.getStatusCode() : "No response"));
        }
    }

    @When("The user requests the product by its id")
    public void theUserRequestsTheProductByItsId() {
        HttpEntity<Void> request = new HttpEntity<>(createHeaders());

        this.response = restTemplate.exchange(
                "/api/v1/product/1",
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {}
        );
    }

    @Then("The product details are correctly retrieved")
    public void theProductDetailsAreCorrectlyRetrieved() {
        if (response == null || !response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Product retrieval failed: " + (response != null ? response.getStatusCode() : "No response"));
        }

        if (!productFieldsAreValid(response.getBody())) {
            throw new RuntimeException("Product retrieval response does not contain expected fields");
        }
    }

    private ProductRequestDTO buildProductRequest(Map<String, String> productData) {
        return new ProductRequestDTO(
                productData.get("name"),
                productData.get("description"),
                productData.get("category"),
                Double.parseDouble(productData.get("price")),
                Integer.parseInt(productData.get("quantity"))
        );
    }

    private boolean productFieldsAreValid(Map<String, Object> body) {
        if (body == null) return false;

        String[] requiredFields = {"name", "description", "category", "price", "quantity"};

        for (String field : requiredFields) {
            if (!body.containsKey(field)) return false;
        }

        return true;
    }

    @When("The user updates the created product using the following information:")
    public void theUserUpdatesTheProductWithTheFollowingInformation(DataTable dataTable) {
        List<Map<String, String>> rows = dataTable.asMaps();
        Map<String, String> productData = rows.getFirst();
        ProductRequestDTO productRequest = buildProductRequest(productData);

        this.response = updateProduct(createdProductId, productRequest);
    }

    @When("The user deletes the created product")
    public void theUserDeletesTheCreatedProduct() {
        this.response = deleteProduct(createdProductId);
    }

    private ResponseEntity<Map<String, Object>> deleteProduct(long productId) {
        HttpEntity<Void> request = new HttpEntity<>(createHeaders());

        return restTemplate.exchange(
                "/api/v1/product/" + productId,
                HttpMethod.DELETE,
                request,
                new ParameterizedTypeReference<>() {}
        );
    }

    @When("The user requests all products")
    public void theUserRequestsAllProducts() {
        HttpEntity<Void> request = new HttpEntity<>(createHeaders());

        this.response = restTemplate.exchange(
                "/api/v1/product/",
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {}
        );
    }

    @Then("All products are successfully retrieved")
    public void allProductsAreSuccessfullyRetrieved() {
        List<Map<String, Object>> products = getProductsAsMap("Product retrieval failed: ",
                                                           "Product retrieval response does not contain product list");

        if (products.isEmpty()) throw new RuntimeException("No products found in the response");
    }

    @When("The user retrieves products filtered by category {string}")
    public void theUserRetrievesProductsFilteredByCategory(String category) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        response = restTemplate.exchange(
                "/api/v1/product/?category=" + category,
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {}
        );
    }


    @Then("The products in the ELECTRONICS category are successfully retrieved")
    public void theProductsInTheELECTRONICSCategoryAreSuccessfullyRetrieved() {
        List<Map<String, Object>> products = getProductsAsMap("Product retrieval by category failed: ",
                                                           "Product retrieval by category response does not contain product list");

        if (products.isEmpty()) throw new RuntimeException("No products found in the ELECTRONICS category");

        for (Map<String, Object> product : products) {
            if (!"ELECTRONICS".equals(product.get("category"))) {
                throw new RuntimeException("Product in the response does not belong to the ELECTRONICS category");
            }
        }
    }

    private List<Map<String, Object>> getProductsAsMap(String error, String message) {
        if (response == null || !response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException(error + (response != null ? response.getStatusCode() : "No response"));
        }

        Map<String, Object> body = response.getBody();
        if (body == null || !body.containsKey("content")) {
            throw new RuntimeException(message);
        }

        return (List<Map<String, Object>>) body.get("content");
    }

    @When("The user retrieves products with a price range between {double} and {double}")
    public void theUserRetrievesProductsWithAPriceRangeBetweenAnd(double minPrice, double maxPrice) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        response = restTemplate.exchange(
                "/api/v1/product/?minPrice=" + minPrice + "&maxPrice=" + maxPrice,
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {}
        );

        ProductSteps.minPrice = minPrice;
        ProductSteps.maxPrice = maxPrice;
    }

    @Then("The products within the specified price range are successfully retrieved")
    public void theProductsWithinTheSpecifiedPriceRangeAreSuccessfullyRetrieved() {
        List<Map<String, Object>> products = getProductsAsMap("Product retrieval by price range failed: ",
                                                           "Product retrieval by price range response does not contain product list");

        if (products.isEmpty()) throw new RuntimeException("No products found in the specified price range");

        for (Map<String, Object> product : products) {
            double price = Double.parseDouble(product.get("price").toString());
            if (minPrice > price || price > maxPrice) {
                throw new RuntimeException("Product price " + price + " is not within the specified range");
            }
        }
    }

    @When("The user attempts to update a product that does not exist with the following information:")
    public void theUserAttemptsToUpdateAProductThatDoesNotExistWithTheFollowingInformation(DataTable dataTable) {
        List<Map<String, String>> rows = dataTable.asMaps();
        Map<String, String> productData = rows.getFirst();
        ProductRequestDTO productRequest = buildProductRequest(productData);

        this.response = updateProduct(99999999, productRequest);

    }

    private ResponseEntity<Map<String, Object>> updateProduct(long productId, ProductRequestDTO productRequest) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        HttpEntity<ProductRequestDTO> request = new HttpEntity<>(productRequest, headers);

        return restTemplate.exchange(
                "/api/v1/product/" + productId,
                HttpMethod.PATCH,
                request,
                new ParameterizedTypeReference<>() {}
        );
    }

    @Given("An unauthenticated user")
    public void anUnauthenticatedUser() {
        token = "";
    }


    @When("The user retrieves products with the following filters")
    public void theUserRetrievesProductsWithTheFollowingFilters(DataTable dataTable) {
        List<Map<String, String>> filters = dataTable.asMaps();
        StringBuilder url = new StringBuilder("/api/v1/product/?");

        for (Map<String, String> filter : filters) {
            if (filter.containsKey("name")) {
                url.append("search=").append(filter.get("name")).append("&");
            }
            if (filter.containsKey("category")) {
                url.append("category=").append(filter.get("category")).append("&");
            }
            if (filter.containsKey("minPrice")) {
                url.append("minPrice=").append(filter.get("minPrice")).append("&");
            }
            if (filter.containsKey("maxPrice")) {
                url.append("maxPrice=").append(filter.get("maxPrice")).append("&");
            }
        }

        HttpEntity<Void> request = new HttpEntity<>(createHeaders());

        this.response = restTemplate.exchange(
                url.toString(),
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {}
        );
    }

    @When("The user attempts to delete a product that does not exist")
    public void theUserAttemptsToDeleteAProductThatDoesNotExist() {
        this.response = deleteProduct(99999999);
    }

    @When("The user retrieves products with the search term {string}")
    public void theUserRetrievesProductsWithTheSearchTerm(String searchTerm) {
        HttpHeaders headers = createHeaders();
        HttpEntity<Void> request = new HttpEntity<>(headers);

        this.searchTerm = searchTerm;

        this.response = restTemplate.exchange(
                "/api/v1/product/?search=" + searchTerm,
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {}
        );
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        if (token != null && !token.isEmpty()) {
            headers.setBearerAuth(token);
        }
        return headers;
    }

    @Then("The products matching the search term are successfully retrieved")
    public void theProductsMatchingTheSearchTermAreSuccessfullyRetrieved() {
        List<Map<String, Object>> products = getProductsAsMap("Product retrieval by search term failed: ",
                "Product retrieval by search term response does not contain product list");

        if (products.isEmpty()) throw new RuntimeException("No products found matching the search term: " + searchTerm);

        for (Map<String, Object> product : products) {
            String name = (String) product.get("name");
            if (name == null || !name.toLowerCase().contains(searchTerm.toLowerCase())) {
                throw new RuntimeException("Product name '" + name + "' does not match the search term '" + searchTerm + "'");
            }
        }
    }


    @Then("The products matching all filters are successfully retrieved")
    public void theProductsMatchingAllFiltersAreSuccessfullyRetrieved() {
        List<Map<String, Object>> products = getProductsAsMap("Product retrieval by filters failed: ",
                "Product retrieval by filters response does not contain product list");

        if (products.isEmpty()) throw new RuntimeException("No products found matching the provided filters");

        for (Map<String, Object> product : products) {
            String name = (String) product.get("name");
            String category = (String) product.get("category");
            double price = Double.parseDouble(product.get("price").toString());

            if (searchTerm != null && !name.toLowerCase().contains(searchTerm.toLowerCase())) {
                throw new RuntimeException("Product name '" + name + "' does not match the search term '" + searchTerm + "'");
            }
            if (!category.equalsIgnoreCase("TOYS")) {
                throw new RuntimeException("Product category '" + category + "' does not match the expected category 'TOYS'");
            }
            if (price < minPrice || price > maxPrice) {
                throw new RuntimeException("Product price " + price + " is not within the specified range of " + minPrice + " to " + maxPrice);
            }
        }

    }
}
