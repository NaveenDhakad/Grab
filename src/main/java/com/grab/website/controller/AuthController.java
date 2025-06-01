package com.grab.website.controller;

import com.grab.website.model.User;
import com.grab.website.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/signin")
    public String showSignInPage(Model model) {
        model.addAttribute("user", new User());
        return "auth/signin";
    }

    @GetMapping("/signup")
    public String showSignUpPage(Model model) {
        model.addAttribute("user", new User());
        return "auth/signup";
    }

    @PostMapping("/signin")
    public String signIn(@ModelAttribute User user, HttpSession session, RedirectAttributes redirectAttributes) {
        User authenticatedUser = userService.authenticate(user.getEmail(), user.getPassword());
        
        if (authenticatedUser != null) {
            session.setAttribute("user", authenticatedUser);
            return "redirect:/dashboard";
        } else {
            redirectAttributes.addFlashAttribute("error", "Invalid email or password");
            return "redirect:/auth/signin";
        }
    }

    @PostMapping("/signup")
    public String signUp(@ModelAttribute User user, RedirectAttributes redirectAttributes) {
        try {
            userService.createUser(user);
            redirectAttributes.addFlashAttribute("success", "Account created successfully! Please sign in.");
            return "redirect:/auth/signin";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Email already exists or invalid data");
            return "redirect:/auth/signup";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }

    @GetMapping("/forgot-password")
    public String showForgotPasswordPage() {
        return "auth/forgot-password";
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam String email, RedirectAttributes redirectAttributes) {
        try {
            userService.sendPasswordResetEmail(email);
            redirectAttributes.addFlashAttribute("success", "Password reset email sent!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Email not found");
        }
        return "redirect:/auth/forgot-password";
    }
}