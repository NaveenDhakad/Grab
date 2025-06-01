package com.grab.website.service;

import com.grab.website.model.Booking;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class BookingService {
    
    private final Map<Long, Booking> bookings = new ConcurrentHashMap<>();
    private Long nextId = 1L;

    public BookingService() {
        // Initialize with some demo bookings
        createDemoBookings();
    }

    private void createDemoBookings() {
        // Demo booking 1
        Booking booking1 = new Booking(1L, "TRANSPORT", "Marina Bay Sands", "Changi Airport", 25.50);
        booking1.setId(nextId++);
        booking1.setStatus("COMPLETED");
        booking1.setDriverName("Ahmad Rahman");
        booking1.setDriverPhone("+65 9123 4567");
        booking1.setVehicleNumber("SBA 1234 X");
        booking1.setCompletedTime(LocalDateTime.now().minusHours(2));
        bookings.put(booking1.getId(), booking1);

        // Demo booking 2
        Booking booking2 = new Booking(1L, "FOOD", "McDonald's Orchard", "123 Orchard Road", 15.80);
        booking2.setId(nextId++);
        booking2.setStatus("IN_PROGRESS");
        booking2.setDriverName("Raj Kumar");
        booking2.setDriverPhone("+65 9876 5432");
        booking2.setVehicleNumber("SBB 5678 Y");
        bookings.put(booking2.getId(), booking2);

        // Demo booking 3
        Booking booking3 = new Booking(2L, "PACKAGE", "Raffles Place", "Jurong East", 12.00);
        booking3.setId(nextId++);
        booking3.setStatus("CONFIRMED");
        booking3.setDriverName("Lim Wei Ming");
        booking3.setDriverPhone("+65 9111 2222");
        booking3.setVehicleNumber("SBC 9999 Z");
        bookings.put(booking3.getId(), booking3);
    }

    public Booking createBooking(Booking booking) {
        booking.setId(nextId++);
        
        // Simulate driver assignment
        String[] driverNames = {"Ahmad Rahman", "Raj Kumar", "Lim Wei Ming", "Sarah Tan", "David Wong"};
        String[] vehicleNumbers = {"SBA 1234 X", "SBB 5678 Y", "SBC 9999 Z", "SBD 1111 A", "SBE 2222 B"};
        
        Random random = new Random();
        booking.setDriverName(driverNames[random.nextInt(driverNames.length)]);
        booking.setVehicleNumber(vehicleNumbers[random.nextInt(vehicleNumbers.length)]);
        booking.setDriverPhone("+65 9" + String.format("%03d", random.nextInt(1000)) + " " + String.format("%04d", random.nextInt(10000)));
        booking.setStatus("CONFIRMED");
        
        bookings.put(booking.getId(), booking);
        return booking;
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookings.values().stream()
                .filter(booking -> booking.getUserId().equals(userId))
                .sorted((b1, b2) -> b2.getBookingTime().compareTo(b1.getBookingTime()))
                .collect(Collectors.toList());
    }

    public List<Booking> getRecentBookings(Long userId) {
        return getUserBookings(userId).stream()
                .limit(5)
                .collect(Collectors.toList());
    }

    public Booking getBookingById(Long id) {
        return bookings.get(id);
    }

    public Booking updateBookingStatus(Long id, String status) {
        Booking booking = bookings.get(id);
        if (booking != null) {
            booking.setStatus(status);
            if ("COMPLETED".equals(status)) {
                booking.setCompletedTime(LocalDateTime.now());
            }
        }
        return booking;
    }

    public List<Booking> getAllBookings() {
        return new ArrayList<>(bookings.values());
    }
}