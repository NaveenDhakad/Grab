/**
 * Main JavaScript file for Grab Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeNavigation();
    initializeAnimations();
    initializeFormValidation();
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

/**
 * Initialize mobile navigation
 */
function initializeNavigation() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Add active class to current page in navigation
    const currentPath = window.location.pathname;
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('text-green-600', 'font-medium');
            link.classList.remove('text-gray-700', 'hover:text-green-600');
        }
    });
}

/**
 * Initialize animations for elements
 */
function initializeAnimations() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
        });
    }
    
    // Add loading animation for service cards
    const serviceCards = document.querySelectorAll('.group');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Initialize form validation
 */
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('input[required], textarea[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Add error message if it doesn't exist
                    let errorMessage = field.parentNode.querySelector('.error-message');
                    if (!errorMessage) {
                        errorMessage = document.createElement('p');
                        errorMessage.className = 'text-red-500 text-sm mt-1 error-message';
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.appendChild(errorMessage);
                    }
                } else {
                    field.classList.remove('border-red-500');
                    const errorMessage = field.parentNode.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4';
                successMessage.innerHTML = '<strong>Success!</strong> Your form has been submitted.';
                form.appendChild(successMessage);
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    successMessage.remove();
                }, 3000);
            }
        });
    });
}

/**
 * Handle download app button click
 */
function downloadApp() {
    // Detect device
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Check if Android device
    if (/android/i.test(userAgent)) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.grabtaxi.passenger';
    } 
    // Check if iOS device
    else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.location.href = 'https://apps.apple.com/app/grab-app/id647268330';
    } 
    // Otherwise show QR code modal
    else {
        showQRCodeModal();
    }
}

/**
 * Show QR code modal for app download
 */
function showQRCodeModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold">Download Grab App</h3>
                <button class="text-gray-500 hover:text-gray-700" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="text-center">
                <p class="mb-4">Scan this QR code to download the Grab app</p>
                <img src="https://via.placeholder.com/200x200/16a34a/ffffff?text=Grab+QR+Code" alt="QR Code" class="mx-auto mb-4">
                <div class="flex justify-center space-x-4">
                    <a href="https://play.google.com/store/apps/details?id=com.grabtaxi.passenger" class="bg-black text-white px-4 py-2 rounded flex items-center">
                        <i class="fab fa-google-play mr-2"></i> Google Play
                    </a>
                    <a href="https://apps.apple.com/app/grab-app/id647268330" class="bg-black text-white px-4 py-2 rounded flex items-center">
                        <i class="fab fa-apple mr-2"></i> App Store
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

/**
 * Close modal
 */
function closeModal(button) {
    const modal = button.closest('.fixed');
    modal.remove();
    document.body.style.overflow = '';
}

// Initialize download buttons
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.download-app-button');
    downloadButtons.forEach(button => {
        button.addEventListener('click', downloadApp);
    });
});