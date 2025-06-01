/**
 * Food page specific JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeRestaurantCards();
    initializeFoodCategories();
});

/**
 * Initialize restaurant cards functionality
 */
function initializeRestaurantCards() {
    const restaurantCards = document.querySelectorAll('.bg-white.rounded-xl.shadow-lg');
    
    restaurantCards.forEach(card => {
        const orderButton = card.querySelector('button');
        
        if (orderButton) {
            orderButton.addEventListener('click', function() {
                const restaurantName = card.querySelector('h3').textContent;
                showRestaurantMenu(restaurantName, card);
            });
        }
    });
}

/**
 * Show restaurant menu modal
 */
function showRestaurantMenu(restaurantName, card) {
    // Create menu items based on restaurant
    let menuItems = [];
    
    if (restaurantName.includes('Burger')) {
        menuItems = [
            { name: 'Classic Burger', price: 8.99, description: 'Beef patty with lettuce, tomato, and special sauce' },
            { name: 'Cheese Burger', price: 9.99, description: 'Classic burger with cheddar cheese' },
            { name: 'Bacon Burger', price: 10.99, description: 'Classic burger with bacon strips' },
            { name: 'Veggie Burger', price: 8.99, description: 'Plant-based patty with fresh vegetables' }
        ];
    } else if (restaurantName.includes('Green')) {
        menuItems = [
            { name: 'Caesar Salad', price: 7.99, description: 'Romaine lettuce with Caesar dressing and croutons' },
            { name: 'Greek Salad', price: 8.99, description: 'Mixed greens with feta cheese and olives' },
            { name: 'Quinoa Bowl', price: 9.99, description: 'Quinoa with roasted vegetables and tahini dressing' },
            { name: 'Avocado Toast', price: 6.99, description: 'Whole grain toast with smashed avocado' }
        ];
    } else if (restaurantName.includes('Sushi')) {
        menuItems = [
            { name: 'California Roll', price: 8.99, description: 'Crab, avocado, and cucumber' },
            { name: 'Salmon Nigiri', price: 10.99, description: 'Fresh salmon over pressed rice' },
            { name: 'Spicy Tuna Roll', price: 9.99, description: 'Spicy tuna with cucumber' },
            { name: 'Vegetable Roll', price: 7.99, description: 'Assorted vegetables' }
        ];
    } else {
        menuItems = [
            { name: 'Signature Dish 1', price: 8.99, description: 'Restaurant\'s signature dish' },
            { name: 'Signature Dish 2', price: 9.99, description: 'Another popular dish' },
            { name: 'Signature Dish 3', price: 10.99, description: 'Chef\'s special' },
            { name: 'Signature Dish 4', price: 7.99, description: 'Customer favorite' }
        ];
    }
    
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    // Generate menu items HTML
    let menuItemsHTML = '';
    menuItems.forEach(item => {
        menuItemsHTML += `
            <div class="border-b border-gray-200 py-4">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-semibold">${item.name}</h4>
                        <p class="text-gray-600 text-sm">${item.description}</p>
                    </div>
                    <div class="flex items-center">
                        <span class="text-green-600 font-medium mr-4">$${item.price.toFixed(2)}</span>
                        <button class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm add-to-cart" 
                                data-name="${item.name}" 
                                data-price="${item.price}">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    // Get restaurant image
    const restaurantImage = card.querySelector('img').src;
    
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="relative h-48 overflow-hidden">
                <img src="${restaurantImage}" alt="${restaurantName}" class="w-full h-full object-cover">
                <div class="absolute top-4 right-4">
                    <button class="bg-white rounded-full p-2 shadow-md close-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-2xl font-bold">${restaurantName}</h3>
                    <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        ${card.querySelector('span').textContent}
                    </span>
                </div>
                <p class="text-gray-600 mb-6">${card.querySelector('p').textContent}</p>
                
                <h4 class="font-semibold text-lg mb-4">Menu</h4>
                <div class="space-y-2">
                    ${menuItemsHTML}
                </div>
                
                <div id="cart-summary" class="mt-6 pt-4 border-t border-gray-200 hidden">
                    <h4 class="font-semibold text-lg mb-2">Your Order</h4>
                    <div id="cart-items" class="space-y-2 mb-4"></div>
                    <div class="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span id="cart-total">$0.00</span>
                    </div>
                    <button class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium mt-4">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', function() {
        modal.remove();
        document.body.style.overflow = '';
    });
    
    // Add to cart functionality
    const cart = [];
    modal.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            
            cart.push({ name, price });
            updateCart(modal, cart);
            
            // Show animation
            this.textContent = 'Added';
            this.classList.add('bg-green-700');
            setTimeout(() => {
                this.textContent = 'Add';
                this.classList.remove('bg-green-700');
            }, 1000);
        });
    });
}

/**
 * Update cart summary
 */
function updateCart(modal, cart) {
    const cartSummary = modal.querySelector('#cart-summary');
    const cartItems = modal.querySelector('#cart-items');
    const cartTotal = modal.querySelector('#cart-total');
    
    if (cart.length > 0) {
        cartSummary.classList.remove('hidden');
        
        // Clear current items
        cartItems.innerHTML = '';
        
        // Group items by name
        const groupedItems = {};
        cart.forEach(item => {
            if (!groupedItems[item.name]) {
                groupedItems[item.name] = {
                    name: item.name,
                    price: item.price,
                    quantity: 1
                };
            } else {
                groupedItems[item.name].quantity++;
            }
        });
        
        // Add items to cart
        Object.values(groupedItems).forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex justify-between items-center';
            itemElement.innerHTML = `
                <span>${item.quantity} x ${item.name}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItems.appendChild(itemElement);
        });
        
        // Update total
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

/**
 * Initialize food categories functionality
 */
function initializeFoodCategories() {
    const categories = document.querySelectorAll('.group.hover\\:shadow-xl.transition-all.duration-300.rounded-xl');
    
    categories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryName = category.querySelector('h3').textContent;
            alert(`You selected the ${categoryName} category. This would filter restaurants to show only ${categoryName} options.`);
        });
    });
}