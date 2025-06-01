package com.grab.website.model;

import java.time.LocalDateTime;

public class Booking {
    private Long id;
    private Long userId;
    private String bookingType; // TRANSPORT, FOOD, PACKAGE
    private String status; // PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
    private String pickupLocation;
    private String destination;
    private Double fare;
    private String driverName;
    private String driverPhone;
    private String vehicleNumber;
    private LocalDateTime bookingTime;
    private LocalDateTime completedTime;
    private String notes;

    // Constructors
    public Booking() {
        this.bookingTime = LocalDateTime.now();
        this.status = "PENDING";
    }

    public Booking(Long userId, String bookingType, String pickupLocation, String destination, Double fare) {
        this();
        this.userId = userId;
        this.bookingType = bookingType;
        this.pickupLocation = pickupLocation;
        this.destination = destination;
        this.fare = fare;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getBookingType() { return bookingType; }
    public void setBookingType(String bookingType) { this.bookingType = bookingType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public Double getFare() { return fare; }
    public void setFare(Double fare) { this.fare = fare; }

    public String getDriverName() { return driverName; }
    public void setDriverName(String driverName) { this.driverName = driverName; }

    public String getDriverPhone() { return driverPhone; }
    public void setDriverPhone(String driverPhone) { this.driverPhone = driverPhone; }

    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }

    public LocalDateTime getBookingTime() { return bookingTime; }
    public void setBookingTime(LocalDateTime bookingTime) { this.bookingTime = bookingTime; }

    public LocalDateTime getCompletedTime() { return completedTime; }
    public void setCompletedTime(LocalDateTime completedTime) { this.completedTime = completedTime; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}