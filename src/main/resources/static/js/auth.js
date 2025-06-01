/**
 * Authentication page specific JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initializePasswordValidation();
    initializeSocialAuth();
});

/**
 * Initialize password validation for signup form
 */
function initializePasswordValidation() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (passwordInput && confirmPasswordInput) {
        // Password strength validation
        passwordInput.addEventListener('input', function() {
            validatePasswordStrength(this.value);
        });
        
        // Confirm password validation
        confirmPasswordInput.addEventListener('input', function() {
            validatePasswordMatch(passwordInput.value, this.value);
        });
        
        // Form submission validation
        const form = passwordInput.closest('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                if (!validateForm()) {
                    e.preventDefault();
                }
            });
        }
    }
}

/**
 * Validate password strength
 */
function validatePasswordStrength(password) {
    const passwordInput = document.getElementById('password');
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    // Remove existing strength indicator
    const existingIndicator = passwordInput.parentNode.querySelector('.password-strength');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    // Create strength indicator
    const strengthIndicator = document.createElement('div');
    strengthIndicator.className = 'password-strength mt-2';
    
    const strength = Object.values(requirements).filter(Boolean).length;
    let strengthText = '';
    let strengthColor = '';
    
    if (strength < 3) {
        strengthText = 'Weak';
        strengthColor = 'text-red-600';
    } else if (strength < 5) {
        strengthText = 'Medium';
        strengthColor = 'text-yellow-600';
    } else {
        strengthText = 'Strong';
        strengthColor = 'text-green-600';
    }
    
    strengthIndicator.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="text-xs ${strengthColor}">Password strength: ${strengthText}</span>
            <div class="flex space-x-1">
                ${Array.from({length: 5}, (_, i) => 
                    `<div class="w-2 h-2 rounded-full ${i < strength ? 
                        (strength < 3 ? 'bg-red-400' : strength < 5 ? 'bg-yellow-400' : 'bg-green-400') : 
                        'bg-gray-200'
                    }"></div>`
                ).join('')}
            </div>
        </div>
    `;
    
    passwordInput.parentNode.appendChild(strengthIndicator);
}

/**
 * Validate password match
 */
function validatePasswordMatch(password, confirmPassword) {
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Remove existing match indicator
    const existingIndicator = confirmPasswordInput.parentNode.querySelector('.password-match');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    if (confirmPassword.length > 0) {
        const matchIndicator = document.createElement('div');
        matchIndicator.className = 'password-match mt-1';
        
        if (password === confirmPassword) {
            matchIndicator.innerHTML = '<span class="text-xs text-green-600"><i class="fas fa-check mr-1"></i>Passwords match</span>';
            confirmPasswordInput.classList.remove('border-red-500');
            confirmPasswordInput.classList.add('border-green-500');
        } else {
            matchIndicator.innerHTML = '<span class="text-xs text-red-600"><i class="fas fa-times mr-1"></i>Passwords do not match</span>';
            confirmPasswordInput.classList.remove('border-green-500');
            confirmPasswordInput.classList.add('border-red-500');
        }
        
        confirmPasswordInput.parentNode.appendChild(matchIndicator);
    }
}

/**
 * Validate entire form before submission
 */
function validateForm() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    
    let isValid = true;
    
    // Check password strength
    if (passwordInput && passwordInput.value.length < 8) {
        showFieldError(passwordInput, 'Password must be at least 8 characters long');
        isValid = false;
    }
    
    // Check password match
    if (confirmPasswordInput && passwordInput.value !== confirmPasswordInput.value) {
        showFieldError(confirmPasswordInput, 'Passwords do not match');
        isValid = false;
    }
    
    // Check terms acceptance
    if (termsCheckbox && !termsCheckbox.checked) {
        showFieldError(termsCheckbox, 'You must accept the terms and conditions');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Show field-specific error
 */
function showFieldError(field, message) {
    // Remove existing error
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error mt-1 text-xs text-red-600';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
    
    // Add error styling
    field.classList.add('border-red-500');
    
    // Remove error after field is corrected
    field.addEventListener('input', function() {
        field.classList.remove('border-red-500');
        const error = field.parentNode.querySelector('.field-error');
        if (error) {
            error.remove();
        }
    }, { once: true });
}

/**
 * Initialize social authentication
 */
function initializeSocialAuth() {
    const googleButton = document.querySelector('button:has(.fa-google)');
    const facebookButton = document.querySelector('button:has(.fa-facebook)');
    
    if (googleButton) {
        googleButton.addEventListener('click', function() {
            // In a real application, this would integrate with Google OAuth
            alert('Google authentication would be implemented here');
        });
    }
    
    if (facebookButton) {
        facebookButton.addEventListener('click', function() {
            // In a real application, this would integrate with Facebook OAuth
            alert('Facebook authentication would be implemented here');
        });
    }
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentNode.querySelector('.toggle-password');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}