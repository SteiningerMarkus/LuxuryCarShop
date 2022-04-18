package com.luxurycars.shop.database.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Car {
    @Id
    @GeneratedValue
    private int id;

    private double price;
    private Date pickUpDate;

    @ManyToOne
    private ShopUser reservedOrBoughtBy;
    @ManyToOne
    private CarType type;

    public int getId() {
        return id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Date getPickUpDate() {
        return pickUpDate;
    }

    public void setPickUpDate(Date pickUpDate) {
        this.pickUpDate = pickUpDate;
    }

    public ShopUser getReservedOrBoughtBy() {
        return reservedOrBoughtBy;
    }

    public void setReservedOrBoughtBy(ShopUser reservedBy) {
        this.reservedOrBoughtBy = reservedBy;
    }

    public CarType getType() {
        return type;
    }

    public void setType(CarType type) {
        this.type = type;
    }
}
