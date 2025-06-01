/**
 * Transport page specific JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeBookingForm();
    initializeRideOptions();
});

/**
 * Initialize booking form functionality
 */
function initializeBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const pickup = bookingForm.querySelector('input[placeholder="Enter pickup location"]').value;
            const destination = bookingForm.querySelector('input[placeholder="Enter destination"]').value;
            const rideType = bookingForm.querySelector('select').value;
            
            if (!pickup || !destination) {
                showFormError('Please enter both pickup and destination locations');
                return;
            }
            
            // Simulate booking process
            showBookingConfirmation(pickup, destination, rideType);
        });
    }
}

/**
 * Show booking error message
 */
function showFormError(message) {
    const bookingForm = document.getElementById('bookingForm');
    
    // Remove existing error message if any
    const existingError = bookingForm.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and append error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 error-message';
    errorDiv.innerHTML = message;
    bookingForm.appendChild(errorDiv);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

/**
 * Show booking confirmation
 */
function showBookingConfirmation(pickup, destination, rideType) {
    const bookingForm = document.getElementById('bookingForm');
    
    // Create confirmation message
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4';
    
    // Generate random booking details
    const bookingId = 'GR' + Math.floor(Math.random() * 1000000);
    const estimatedTime = Math.floor(Math.random() * 10) + 5;
    const estimatedPrice = Math.floor(Math.random() * 20) + 10;
    
    confirmationDiv.innerHTML = `
        <strong>Booking Confirmed!</strong>
        <p>Your ${rideType} has been booked.</p>
        <p>From: ${pickup}</p>
        <p>To: ${destination}</p>
        <p>Booking ID: ${bookingId}</p>
        <p>Estimated arrival time: ${estimatedTime} minutes</p>
        <p>Estimated fare: $${estimatedPrice}</p>
    `;
    
    bookingForm.innerHTML = '';
    bookingForm.appendChild(confirmationDiv);
    
    // Add a "Book Another Ride" button
    const bookAgainButton = document.createElement('button');
    bookAgainButton.className = 'w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium mt-4';
    bookAgainButton.textContent = 'Book Another Ride';
    bookAgainButton.addEventListener('click', function() {
        window.location.reload();
    });
    
    bookingForm.appendChild(bookAgainButton);
}

/**
 * Initialize ride options functionality
 */
function initializeRideOptions() {
    const rideOptions = document.querySelectorAll('.group');
    
    rideOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Highlight selected option
            rideOptions.forEach(opt => opt.classList.remove('ring-2', 'ring-green-600'));
            option.classList.add('ring-2', 'ring-green-600');
            
            // Scroll to booking form
            const bookingForm = document.getElementById('bookingForm');
            if (bookingForm) {
                bookingForm.scrollIntoView({ behavior: 'smooth' });
                
                // Update ride type in form if it exists
                const rideTypeSelect = bookingForm.querySelector('select');
                if (rideTypeSelect) {
                    const rideTitle = option.querySelector('h3').textContent;
                    
                    // Find and select the matching option
                    Array.from(rideTypeSelect.options).forEach(opt => {
                        if (opt.text.includes(rideTitle)) {
                            rideTypeSelect.value = opt.value;
                        }
                    });
                }
            }
        });
    });
}