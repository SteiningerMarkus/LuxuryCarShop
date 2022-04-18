package com.luxurycars.shop.api;

import com.luxurycars.shop.api.dtos.CredentialsDto;
import com.luxurycars.shop.database.DbRepository;
import com.luxurycars.shop.database.model.Car;
import com.luxurycars.shop.database.model.ShopUser;
import org.jboss.resteasy.reactive.RestResponse;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.net.URI;
import java.util.Date;
import java.util.List;

@Path("/api")
public class LuxuryCarShopService {
    @Inject
    protected DbRepository repo;

    @POST()
    @Path("/user/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public RestResponse register(ShopUser user) {
        if (repo.getUser(user.getUsername()) != null)
            return RestResponse.status(403);
        repo.createUser(user);
        return RestResponse.created(URI.create(""));
    }

    @POST()
    @Path("/user/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<ShopUser> login(CredentialsDto credentials) {
        System.out.println("login ------------------------");

        ShopUser user = repo.getUser(credentials.getUsername());

        if (user == null)
            return RestResponse.notFound();
        if (!user.getPassword().equals(credentials.getPassword()))
            return RestResponse.status(401);
        return RestResponse.ok(user);
    }

    @GET
    @Path("/cars/available")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Car> getAvailableCars(@QueryParam("username") String username) {
        return username == null ? repo.getAvailableCars() : repo.getAvailableCars(username);
    }

    @POST
    @Path("/cars/{carId}/reserve")
    public RestResponse reserveCar(@QueryParam("username") String username, @PathParam("carId") int carId) {
        System.out.println("reserve ------------------------");

        ShopUser user = repo.getUser(username);
        Car car = repo.getCar(carId);

        if (user == null || car == null)
            return RestResponse.notFound();

        car.setReservedOrBoughtBy(user);

        return RestResponse.ok();
    }

    @POST
    @Path("/cars/{carId}/unreserve")
    public RestResponse unreserveCar(@PathParam("carId") int carId) {
        Car car = repo.getCar(carId);

        if (car == null)
            return RestResponse.notFound();

        car.setReservedOrBoughtBy(null);

        return RestResponse.ok();
    }

    @POST
    @Path("/cars/buy")
    public RestResponse buyCar(@QueryParam("username") String username, @QueryParam("carId") int carId, @QueryParam("pickupDate") Date pickupDate) {
        ShopUser user = repo.getUser(username);
        Car car = repo.getCar(carId);

        if (user == null || car == null)
            return RestResponse.notFound();

        if (car.getReservedOrBoughtBy() != null && car.getReservedOrBoughtBy() != user)
            return RestResponse.status(401);

        car.setReservedOrBoughtBy(user);
        car.setPickUpDate(pickupDate);

        return RestResponse.ok();
    }

    @POST
    @Path("/cars/pickup")
    public RestResponse pickUpCar(@QueryParam("carId") int carId) {
        Car car = repo.getCar(carId);

        if (car == null)
            return RestResponse.notFound();

        ShopUser user = car.getReservedOrBoughtBy();
        user.getPickedUpCars().add(car.getType());

        repo.deleteCar(car);

        return RestResponse.ok();
    }
}
