/**
 * Packages page specific JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeTrackingForm();
    initializeDeliveryOptions();
});

/**
 * Initialize package tracking form
 */
function initializeTrackingForm() {
    const trackingForm = document.getElementById('trackingForm');
    
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const trackingNumber = trackingForm.querySelector('input').value;
            
            if (!trackingNumber) {
                showTrackingError('Please enter a tracking number');
                return;
            }
            
            // Simulate tracking result
            showTrackingResult(trackingNumber);
        });
    }
}

/**
 * Show tracking error message
 */
function showTrackingError(message) {
    const trackingForm = document.getElementById('trackingForm');
    
    // Remove existing error message if any
    const existingError = trackingForm.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and append error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 error-message';
    errorDiv.innerHTML = message;
    trackingForm.appendChild(errorDiv);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

/**
 * Show tracking result
 */
function showTrackingResult(trackingNumber) {
    // Create modal for tracking result
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    // Generate random tracking status
    const statuses = [
        { status: 'Picked up', time: '10:30 AM', completed: true },
        { status: 'In transit', time: '11:45 AM', completed: Math.random() > 0.3 },
        { status: 'Out for delivery', time: '1:15 PM', completed: Math.random() > 0.6 },
        { status: 'Delivered', time: '2:30 PM', completed: Math.random() > 0.8 }
    ];
    
    // Generate random delivery details
    const estimatedDelivery = Math.random() > 0.7 ? 'Delivered' : `${Math.floor(Math.random() * 60) + 10} minutes`;
    const currentLocation = 'En route to destination';
    
    // Generate tracking steps HTML
    let trackingStepsHTML = '';
    statuses.forEach((step, index) => {
        trackingStepsHTML += `
            <div class="flex items-start">
                <div class="flex flex-col items-center mr-4">
                    <div class="w-8 h-8 rounded-full ${step.completed ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'} flex items-center justify-center">
                        ${index + 1}
                    </div>
                    ${index < statuses.length - 1 ? `<div class="h-12 w-0.5 ${statuses[index + 1].completed ? 'bg-blue-600' : 'bg-gray-200'}"></div>` : ''}
                </div>
                <div class="pb-8">
                    <h4 class="font-semibold ${step.completed ? 'text-blue-600' : 'text-gray-500'}">${step.status}</h4>
                    <p class="text-sm text-gray-500">${step.completed ? step.time : '-'}</p>
                </div>
            </div>
        `;
    });
    
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full p-6">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold">Package Tracking</h3>
                <button class="text-gray-500 hover:text-gray-700 close-modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="mb-6">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-gray-600">Tracking Number:</span>
                    <span class="font-semibold">${trackingNumber}</span>
                </div>
                <div class="flex justify-between items-center mb-2">
                    <span class="text-gray-600">Estimated Delivery:</span>
                    <span class="font-semibold">${estimatedDelivery}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-600">Current Location:</span>
                    <span class="font-semibold">${currentLocation}</span>
                </div>
            </div>
            
            <h4 class="font-semibold text-lg mb-4">Tracking History</h4>
            <div class="space-y-2">
                ${trackingStepsHTML}
            </div>
            
            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium mt-6 close-modal">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    modal.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            modal.remove();
            document.body.style.overflow = '';
        });
    });
}

/**
 * Initialize delivery options functionality
 */
function initializeDeliveryOptions() {
    const deliveryOptions = document.querySelectorAll('.group');
    
    deliveryOptions.forEach(option => {
        option.addEventListener('click', function() {
            const optionName = option.querySelector('h3').textContent;
            
            // Create modal for delivery option details
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            
            // Generate content based on option
            let content = '';
            let price = '';
            let deliveryTime = '';
            
            if (optionName.includes('Express')) {
                content = 'Our fastest delivery option for urgent packages. Your package will be picked up and delivered within 1 hour.';
                price = '$15.99';
                deliveryTime = 'Within 1 hour';
            } else if (optionName.includes('Same-Day')) {
                content = 'Affordable delivery option for packages that need to be delivered on the same day.';
                price = '$9.99';
                deliveryTime = 'Same day (within 8 hours)';
            } else if (optionName.includes('Bulk')) {
                content = 'Ideal for multiple packages or larger items that need to be delivered together.';
                price = '$19.99 base + $5 per additional package';
                deliveryTime = 'Within 3 hours';
            }
            
            modal.innerHTML = `
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold">${optionName}</h3>
                        <button class="text-gray-500 hover:text-gray-700 close-modal">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <p class="text-gray-600 mb-6">${content}</p>
                    
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Price:</span>
                            <span class="font-semibold">${price}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Delivery Time:</span>
                            <span class="font-semibold">${deliveryTime}</span>
                        </div>
                    </div>
                    
                    <div class="flex space-x-4 mt-6">
                        <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
                            Book Now
                        </button>
                        <button class="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-medium close-modal">
                            Cancel
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Close modal functionality
            modal.querySelectorAll('.close-modal').forEach(button => {
                button.addEventListener('click', function() {
                    modal.remove();
                    document.body.style.overflow = '';
                });
            });
            
            // Book now functionality
            const bookButton = modal.querySelector('.bg-blue-600');
            if (bookButton) {
                bookButton.addEventListener('click', function() {
                    modal.remove();
                    document.body.style.overflow = '';
                    
                    // Scroll to booking form or show booking modal
                    alert(`You selected ${optionName}. This would take you to the booking form.`);
                });
            }
        });
    });
}