package com.grab.website.controller;

import com.grab.website.model.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/services")
    public ResponseEntity<List<Service>> getServices() {
        List<Service> services = Arrays.asList(
            new Service("Transport", "Safe, reliable rides at the tap of a button", "car", "green"),
            new Service("Food Delivery", "Your favorite meals delivered fast", "utensils", "orange"),
            new Service("Package Delivery", "Send packages across the city quickly", "package", "blue"),
            new Service("GrabPay", "Cashless payments made simple", "credit-card", "purple")
        );
        return ResponseEntity.ok(services);
    }

    @PostMapping("/book-ride")
    public ResponseEntity<Map<String, Object>> bookRide(@RequestBody Map<String, String> rideRequest) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Ride booked successfully!");
        response.put("estimatedTime", "5-10 minutes");
        response.put("bookingId", "GR" + System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/order-food")
    public ResponseEntity<Map<String, Object>> orderFood(@RequestBody Map<String, String> foodOrder) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Food order placed successfully!");
        response.put("estimatedDelivery", "30-45 minutes");
        response.put("orderId", "GF" + System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/app-stats")
    public ResponseEntity<Map<String, Object>> getAppStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("downloads", "50M+");
        stats.put("countries", 8);
        stats.put("cities", "500+");
        stats.put("drivers", "5M+");
        stats.put("rating", 4.8);
        return ResponseEntity.ok(stats);
    }
}