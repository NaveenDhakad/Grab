package com.grab.website.service;

import com.grab.website.model.User;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {
    
    private final Map<String, User> users = new ConcurrentHashMap<>();
    private Long nextId = 1L;

    public UserService() {
        // Initialize with some demo users
        createDemoUsers();
    }

    private void createDemoUsers() {
        User demoUser = new User("John", "Doe", "john.doe@example.com", "password123", "+1234567890");
        demoUser.setId(nextId++);
        demoUser.setWalletBalance(50.0);
        users.put(demoUser.getEmail(), demoUser);

        User demoUser2 = new User("Jane", "Smith", "jane.smith@example.com", "password123", "+1234567891");
        demoUser2.setId(nextId++);
        demoUser2.setWalletBalance(75.0);
        users.put(demoUser2.getEmail(), demoUser2);
    }

    public User authenticate(String email, String password) {
        User user = users.get(email);
        if (user != null && user.getPassword().equals(password) && user.isActive()) {
            return user;
        }
        return null;
    }

    public User createUser(User user) throws Exception {
        if (users.containsKey(user.getEmail())) {
            throw new Exception("Email already exists");
        }
        
        user.setId(nextId++);
        users.put(user.getEmail(), user);
        return user;
    }

    public User getUserById(Long id) {
        return users.values().stream()
                .filter(user -> user.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public User getUserByEmail(String email) {
        return users.get(email);
    }

    public User updateUser(User user) {
        if (users.containsKey(user.getEmail())) {
            users.put(user.getEmail(), user);
            return user;
        }
        return null;
    }

    public void sendPasswordResetEmail(String email) throws Exception {
        User user = users.get(email);
        if (user == null) {
            throw new Exception("Email not found");
        }
        
        // In a real application, you would send an actual email
        System.out.println("Password reset email sent to: " + email);
    }

    public List<User> getAllUsers() {
        return new ArrayList<>(users.values());
    }
}