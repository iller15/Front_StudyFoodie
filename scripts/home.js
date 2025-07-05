function getRandomDishes(dishes, count) {
  const shuffled = dishes.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const userId = '79cbe3c8-4fd5-43d5-870f-3496fe21f45a';
const randomDishes = getRandomDishes(db.get('dishes'), 6);
const dishesContainer = document.querySelector('.dishes-container');

if (dishesContainer) {
  dishesContainer.innerHTML = randomDishes
    .map(dish => dishController.createTemplate(dish.id, userId))
    .join('');
}