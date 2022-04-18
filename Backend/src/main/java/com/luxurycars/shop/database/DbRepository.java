package com.luxurycars.shop.database;

import com.luxurycars.shop.database.model.Car;
import com.luxurycars.shop.database.model.ShopUser;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class DbRepository {
    @Inject
    protected EntityManager em;

    public ShopUser getUser(String username) {
        List<ShopUser> users = em.createQuery("select u from ShopUser u where u.username = :username", ShopUser.class).setParameter("username", username).getResultList();
        if (users.isEmpty())
            return null;
        return users.get(0);
    }

    @Transactional
    public void createUser(ShopUser user) {
        em.persist(user);
    }

    public Car getCar(int id) {
        List<Car> cars = em.createQuery("select c from Car c where c.id = :id", Car.class).setParameter("id", id).getResultList();
        if (cars.isEmpty())
            return null;
        return cars.get(0);
    }

    public List<Car> getAvailableCars() {
        return em.createQuery("select c from Car c where c.reservedOrBoughtBy is null", Car.class).getResultList();
    }

    public List<Car> getAvailableCars(String username) {
        return em.createQuery("select c from Car c where c.reservedOrBoughtBy is null or c.reservedOrBoughtBy.username = :username", Car.class).setParameter("username", username).getResultList();
    }

    @Transactional
    public void deleteCar(Car car) {
        em.remove(car);
    }
}
