function getRandomDishes(dishes, count) {
  const shuffled = dishes.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const userId = db.get('current');
const randomDishes = getRandomDishes(db.get('dishes'), 6);
const dishesContainer = document.querySelector('.dishes-container');

function updateCartBubble() {
  const bubble = document.getElementById('cart-bubble');
  const currentUserId = db.get('current');
  let count = 0;
  if (currentUserId) {
    const user = userController.getbyId(currentUserId);
    if (user && Array.isArray(user.cart)) {
      count = user.cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    }
  }
  if (bubble) {
    bubble.textContent = count;
    bubble.style.display = count > 0 ? 'flex' : 'none';
  }
}

function renderDishes() {
  if (!dishesContainer) return;
  dishesContainer.innerHTML = randomDishes
    .map(dish => dishController.createTemplate(dish.id, userId))
    .join('');


  // Favorite heart toggle
  document.querySelectorAll('.favorite_action .icon.heart').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    const dishItem = this.closest('.dish_item');
    const dishId = dishItem ? dishItem.id : null;
    const currentUserId = db.get('current');
    if (!currentUserId) return;
    userController.toggleFavorite(currentUserId, dishId);
    renderDishes();
    });
  });

  // Add to cart
  document.querySelectorAll('.dish_item-add_cart-action .action-newadd').forEach(btn => {
    btn.addEventListener('click', function () {
      const dishItem = this.closest('.dish_item');
      const dishId = dishItem ? dishItem.id : null;
      const currentUserId = db.get('current');
      if (!currentUserId) {
        alert('Debes iniciar sesión para añadir al carrito.');
        return;
      }
      userController.addToCart(currentUserId, dishId, 1);
      updateCartBubble();
      renderDishes(); // re-render to show + and - buttons if needed
    });
  });

  // Increase quantity
  document.querySelectorAll('.dish_item-add_cart-action .increase').forEach(btn => {
    btn.addEventListener('click', function () {
      const dishItem = this.closest('.dish_item');
      const dishId = dishItem ? dishItem.id : null;
      const currentUserId = db.get('current');
      if (!currentUserId) return;
      userController.addToCart(currentUserId, dishId, 1);
      updateCartBubble();
      renderDishes();
    });
  });

  // Decrease quantity
  document.querySelectorAll('.dish_item-add_cart-action .decrease').forEach(btn => {
    btn.addEventListener('click', function () {
      const dishItem = this.closest('.dish_item');
      const dishId = dishItem ? dishItem.id : null;
      const currentUserId = db.get('current');
      if (!currentUserId) return;
      // Remove one from cart, or remove item if quantity is 1
      const users = db.get('users') || [];
      const userIdx = users.findIndex(u => u.id === currentUserId);
      if (userIdx === -1) return;
      const user = users[userIdx];
      const cartItem = user.cart.find(item => item.id === dishId);
      if (cartItem) {
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
        } else {
          user.cart = user.cart.filter(item => item.id !== dishId);
        }
        users[userIdx] = user;
        db.set('users', users);
      }
      updateCartBubble();
      renderDishes();
    });
  });
}

window.addEventListener('DOMContentLoaded', function () {
  renderDishes();
  updateCartBubble();
});

