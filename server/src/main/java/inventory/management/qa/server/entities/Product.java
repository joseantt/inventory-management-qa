package inventory.management.qa.server.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.hibernate.envers.Audited;

@Entity
@Audited
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String description;
  @Enumerated(EnumType.STRING)
  private Category category;
  private double price;
  private int quantity;
  private int olderQuantity;

  public Product() {
  }

  public Product(String name, String description, Category category, double price, int quantity) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
    this.olderQuantity = quantity;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Category getCategory() {
    return category;
  }

  public void setCategory(Category category) {
    this.category = category;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public int getOlderQuantity() {
      return olderQuantity;
  }

  public void setOlderQuantity(int olderQuantity) {
      this.olderQuantity = olderQuantity;
  }
}
