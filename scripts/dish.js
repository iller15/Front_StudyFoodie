const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let currentQuantity = 1;
let currentDish = null;

function updateQuantityDisplay() {
  const quantityDisplay = document.getElementById('quantity-display');
  const decreaseBtn = document.getElementById('decrease-btn');
  
  if (quantityDisplay) {
    quantityDisplay.textContent = currentQuantity;
  }
  
  if (decreaseBtn) {
    decreaseBtn.disabled = currentQuantity <= 1;
  }
}

function updateCartButton() {
  const currentUserId = db.get('current');
  const cartBtnText = document.getElementById('cart-btn-text');
  
  if (!currentUserId || !currentDish) return;
  
  const user = userController.getbyId(currentUserId);
  if (user && user.cart) {
    const cartItem = user.cart.find(item => item.id === currentDish.id);
    if (cartItem) {
      cartBtnText.textContent = `En carrito (${cartItem.quantity})`;
    } else {
      cartBtnText.textContent = 'Añadir al carrito';
    }
  }
}

function loadDishData() {
  try {
    currentDish = dishController.get(id);
    
    if (currentDish) {
      // Update dish information
      const dishImage = document.getElementById('dish_ind-image');
      const dishPrice = document.getElementById('dish_ind-price');
      const dishName = document.getElementById('dish_ind-name');
      const dishWeight = document.getElementById('dish_ind-weight');
      
      if (dishImage) dishImage.src = currentDish.image;
      if (dishImage) dishImage.alt = currentDish.name;
      if (dishPrice) dishPrice.textContent = `S/ ${currentDish.price.toFixed(2)}`;
      if (dishName) dishName.textContent = currentDish.name;
      if (dishWeight) dishWeight.textContent = `${currentDish.weight}gr`;
      
      updateCartButton();
    } else {
      console.error('Dish not found');
      // Redirect to home or show error
      // window.location.href = '/index.html';
    }
  } catch (error) {
    console.log('> Error loading dish data:', error);
  }
}

function initializeEventListeners() {
  const increaseBtn = document.getElementById('increase-btn');
  const decreaseBtn = document.getElementById('decrease-btn');
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  
  // Increase quantity
  if (increaseBtn) {
    increaseBtn.addEventListener('click', function() {
      currentQuantity++;
      updateQuantityDisplay();
    });
  }
  
  // Decrease quantity
  if (decreaseBtn) {
    decreaseBtn.addEventListener('click', function() {
      if (currentQuantity > 1) {
        currentQuantity--;
        updateQuantityDisplay();
      }
    });
  }
  
  // Add to cart
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      const currentUserId = db.get('current');
      
      if (!currentUserId) {
        alert('Debes iniciar sesión para añadir al carrito.');
        window.location.href = '/auth/login.html';
        return;
      }
      
      if (!currentDish) {
        return;
      }
      
      // Add to cart using the existing controller
      const success = userController.addToCart(currentUserId, currentDish.id, currentQuantity);
      
      if (success) {
        updateCartButton();
        currentQuantity = 1; // Reset quantity
        updateQuantityDisplay();
      } else {
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  loadDishData();
  updateQuantityDisplay();
  initializeEventListeners();
});