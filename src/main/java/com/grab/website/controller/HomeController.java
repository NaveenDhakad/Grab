package com.grab.website.controller;

import com.grab.website.model.Service;
import com.grab.website.model.Feature;
import com.grab.website.model.Statistic;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Arrays;
import java.util.List;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        // Add services data
        List<Service> services = Arrays.asList(
            new Service("Transport", "Safe, reliable rides at the tap of a button", "car", "green"),
            new Service("Food Delivery", "Your favorite meals delivered fast", "utensils", "orange"),
            new Service("Package Delivery", "Send packages across the city quickly", "package", "blue"),
            new Service("GrabPay", "Cashless payments made simple", "credit-card", "purple")
        );

        // Add features data
        List<Feature> features = Arrays.asList(
            new Feature("Safety First", "Enhanced safety features including driver verification, GPS tracking, and 24/7 support.", "shield"),
            new Feature("Always Available", "Round-the-clock service with quick response times and reliable delivery.", "clock"),
            new Feature("Wide Coverage", "Available across Southeast Asia with extensive network coverage.", "map-pin")
        );

        // Add statistics data
        List<Statistic> statistics = Arrays.asList(
            new Statistic("50M+", "App Downloads"),
            new Statistic("8", "Countries"),
            new Statistic("500+", "Cities"),
            new Statistic("5M+", "Driver Partners")
        );

        model.addAttribute("services", services);
        model.addAttribute("features", features);
        model.addAttribute("statistics", statistics);

        return "index";
    }

    @GetMapping("/transport")
    public String transport() {
        return "transport";
    }

    @GetMapping("/food")
    public String food() {
        return "food";
    }

    @GetMapping("/packages")
    public String packages() {
        return "packages";
    }

    @GetMapping("/business")
    public String business() {
        return "business";
    }


}