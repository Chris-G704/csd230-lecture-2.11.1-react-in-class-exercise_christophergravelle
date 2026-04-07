package csd230.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("STATIONERY")
public class StationeryEntity extends ProductEntity {
    private String name;
    private String brand;
    private double price;

    public StationeryEntity() {}
    public StationeryEntity(String name, String brand, double price) {
        this.name = name;
        this.brand = brand;
        this.price = price;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    @Override public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    @Override public void sellItem() { System.out.println("Sold stationery: " + name); }
}