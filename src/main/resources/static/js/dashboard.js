/**
 * Dashboard specific JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    initializeQuickActions();
    loadRecentActivity();
});

/**
 * Initialize dashboard functionality
 */
function initializeDashboard() {
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize refresh functionality
    initializeRefresh();
    
    // Initialize notifications
    checkForNotifications();
}

/**
 * Toggle user dropdown menu
 */
function toggleDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('hidden');
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.relative')) {
            dropdown.classList.add('hidden');
        }
    });
}

/**
 * Initialize quick actions
 */
function initializeQuickActions() {
    const quickActionButtons = document.querySelectorAll('[href^="/transport"], [href^="/food"], [href^="/packages"]');
    
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
            this.disabled = true;
            
            // Simulate loading delay
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1000);
        });
    });
}

/**
 * Load recent activity
 */
function loadRecentActivity() {
    // Simulate loading recent activity
    const activityContainer = document.querySelector('.recent-activity');
    
    if (activityContainer) {
        // Add loading skeleton
        showLoadingSkeleton(activityContainer);
        
        // Simulate API call
        setTimeout(() => {
            hideLoadingSkeleton(activityContainer);
            // Activity would be loaded here
        }, 1500);
    }
}

/**
 * Show loading skeleton
 */
function showLoadingSkeleton(container) {
    const skeleton = document.createElement('div');
    skeleton.className = 'loading-skeleton space-y-4';
    skeleton.innerHTML = `
        ${Array.from({length: 3}, () => `
            <div class="animate-pulse flex items-center space-x-4">
                <div class="w-10 h-10 bg-gray-300 rounded-lg"></div>
                <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div class="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div class="w-16 h-4 bg-gray-300 rounded"></div>
            </div>
        `).join('')}
    `;
    
    container.appendChild(skeleton);
}

/**
 * Hide loading skeleton
 */
function hideLoadingSkeleton(container) {
    const skeleton = container.querySelector('.loading-skeleton');
    if (skeleton) {
        skeleton.remove();
    }
}

/**
 * Initialize tooltips
 */
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this, this.getAttribute('data-tooltip'));
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

/**
 * Show tooltip
 */
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip absolute z-50 bg-gray-900 text-white text-xs rounded py-1 px-2';
    tooltip.textContent = text;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
}

/**
 * Hide tooltip
 */
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

/**
 * Initialize refresh functionality
 */
function initializeRefresh() {
    const refreshButton = document.getElementById('refreshButton');
    
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            // Add spinning animation
            const icon = this.querySelector('i');
            icon.classList.add('fa-spin');
            
            // Simulate refresh
            setTimeout(() => {
                icon.classList.remove('fa-spin');
                showNotification('Dashboard refreshed successfully', 'success');
            }, 1000);
        });
    }
}

/**
 * Check for notifications
 */
function checkForNotifications() {
    // Simulate checking for notifications
    setTimeout(() => {
        const notifications = [
            {
                type: 'info',
                message: 'Your ride booking is confirmed',
                time: '2 minutes ago'
            },
            {
                type: 'success',
                message: 'Food order delivered successfully',
                time: '1 hour ago'
            }
        ];
        
        if (notifications.length > 0) {
            showNotificationBadge(notifications.length);
        }
    }, 2000);
}

/**
 * Show notification badge
 */
function showNotificationBadge(count) {
    const badge = document.createElement('div');
    badge.className = 'notification-badge absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center';
    badge.textContent = count;
    
    const userButton = document.querySelector('.relative button');
    if (userButton && !userButton.querySelector('.notification-badge')) {
        userButton.style.position = 'relative';
        userButton.appendChild(badge);
    }
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' :
        type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' :
        'bg-blue-100 border border-blue-400 text-blue-700'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-gray-500 hover:text-gray-700">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

/**
 * Update wallet balance
 */
function updateWalletBalance(newBalance) {
    const balanceElement = document.querySelector('[data-wallet-balance]');
    if (balanceElement) {
        balanceElement.textContent = `$${newBalance.toFixed(2)}`;
        
        // Add animation
        balanceElement.classList.add('animate-pulse');
        setTimeout(() => {
            balanceElement.classList.remove('animate-pulse');
        }, 1000);
    }
}

/**
 * Handle quick booking
 */
function quickBook(serviceType) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    let modalContent = '';
    
    switch(serviceType) {
        case 'transport':
            modalContent = `
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 class="text-xl font-bold mb-4">Quick Ride Booking</h3>
                    <form id="quickRideForm" class="space-y-4">
                        <input type="text" placeholder="Pickup location" class="w-full px-3 py-2 border rounded-lg" required>
                        <input type="text" placeholder="Destination" class="w-full px-3 py-2 border rounded-lg" required>
                        <select class="w-full px-3 py-2 border rounded-lg">
                            <option>GrabCar</option>
                            <option>GrabCar Plus</option>
                            <option>GrabBike</option>
                        </select>
                        <div class="flex space-x-4">
                            <button type="submit" class="flex-1 bg-green-600 text-white py-2 rounded-lg">Book Now</button>
                            <button type="button" onclick="closeQuickBookModal()" class="flex-1 border border-gray-300 py-2 rounded-lg">Cancel</button>
                        </div>
                    </form>
                </div>
            `;
            break;
        case 'food':
            modalContent = `
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 class="text-xl font-bold mb-4">Quick Food Order</h3>
                    <form id="quickFoodForm" class="space-y-4">
                        <input type="text" placeholder="Delivery address" class="w-full px-3 py-2 border rounded-lg" required>
                        <input type="text" placeholder="Restaurant or cuisine" class="w-full px-3 py-2 border rounded-lg" required>
                        <div class="flex space-x-4">
                            <button type="submit" class="flex-1 bg-orange-600 text-white py-2 rounded-lg">Find Food</button>
                            <button type="button" onclick="closeQuickBookModal()" class="flex-1 border border-gray-300 py-2 rounded-lg">Cancel</button>
                        </div>
                    </form>
                </div>
            `;
            break;
        case 'package':
            modalContent = `
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 class="text-xl font-bold mb-4">Quick Package Delivery</h3>
                    <form id="quickPackageForm" class="space-y-4">
                        <input type="text" placeholder="Pickup address" class="w-full px-3 py-2 border rounded-lg" required>
                        <input type="text" placeholder="Delivery address" class="w-full px-3 py-2 border rounded-lg" required>
                        <select class="w-full px-3 py-2 border rounded-lg">
                            <option>Express Delivery</option>
                            <option>Same-Day Delivery</option>
                            <option>Bulk Delivery</option>
                        </select>
                        <div class="flex space-x-4">
                            <button type="submit" class="flex-1 bg-blue-600 text-white py-2 rounded-lg">Send Package</button>
                            <button type="button" onclick="closeQuickBookModal()" class="flex-1 border border-gray-300 py-2 rounded-lg">Cancel</button>
                        </div>
                    </form>
                </div>
            `;
            break;
    }
    
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

/**
 * Close quick booking modal
 */
function closeQuickBookModal() {
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}