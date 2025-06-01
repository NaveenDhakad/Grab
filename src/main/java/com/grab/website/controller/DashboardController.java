package com.grab.website.controller;

import com.grab.website.model.User;
import com.grab.website.model.Booking;
import com.grab.website.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public String dashboard(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return "redirect:/auth/signin";
        }

        List<Booking> recentBookings = bookingService.getRecentBookings(user.getId());
        model.addAttribute("user", user);
        model.addAttribute("recentBookings", recentBookings);
        
        return "dashboard/index";
    }

    @GetMapping("/profile")
    public String profile(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return "redirect:/auth/signin";
        }
        
        model.addAttribute("user", user);
        return "dashboard/profile";
    }

    @GetMapping("/bookings")
    public String bookings(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return "redirect:/auth/signin";
        }
        
        List<Booking> allBookings = bookingService.getUserBookings(user.getId());
        model.addAttribute("user", user);
        model.addAttribute("bookings", allBookings);
        
        return "dashboard/bookings";
    }

    @GetMapping("/wallet")
    public String wallet(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return "redirect:/auth/signin";
        }
        
        model.addAttribute("user", user);
        return "dashboard/wallet";
    }
}