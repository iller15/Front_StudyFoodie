/* 
class User {
    constructor(tel, mail, password) {
        this.tel = tel;
        this.mail = mail;
        this.password = password;
    }
}


var users = [
    new User('123546789', 'joaquin@web.com', 'Hola1234')
];

function validateUser(){
    const mail = document.getElementById("mail").value;
    const mailErr = document.getElementById("mail-error");

    const pass = document.getElementById("password").value;
    const passErr = document.getElementById("password-error");

}
*/

class LocalDatabase {
  constructor() {}

  setObj(obj) {
    for (const key in obj) {
      if (localStorage.getItem(key) !== null) continue;
      this.set(key, obj[key])
    }
  }

  forceSet(obj) {
    for (const key in obj) {
      this.set(key, obj[key])
    }
  }

  set(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
  get(key) {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  }
  reset() {
    localStorage.clear();
  }
}

//TODO Add a variable to load only 1 time, using the constructor
//! Test data inserted in loading page every time
let users = [
  {
    id: '79cbe3c8-4fd5-43d5-870f-3496fe21f45a',
    image: '/media/users/juanpablo.jpg',
    name: 'Juan Pablo Perez Peralta',
    //email: 'juanpablo19@gmail.com',
    email: 'test@test.com',
    phone: '+51 975 252 532',
    //password: 'yosoyjuanpablo123',
    password: '123',
    favorites: [
      '67390c50-f771-4c1e-b921-6703707cf4c4'
    ],
    cart: [
      {
        id: 'd11e4d4c-db29-4241-a386-6eb33df72b02',
        quantity: 2
      }
    ]
  }
];

//TODO Add the NEW label in the dish with a variable
//TODO Add a discount with logic in front
let dishes = [
  {
    id: 'd11e4d4c-db29-4241-a386-6eb33df72b02',
    image: '',
    name: 'Bowl de quinua',
    price: 12.00,
    weight: 450,
  },
  {
    id: '829985b0-14c0-404f-895c-9d95e6d5f133',
    image: '',
    name: 'Ensalada de atun',
    price: 6.00,
    weight: 300,
  },
  {
    id: '67390c50-f771-4c1e-b921-6703707cf4c4',
    image: '',
    name: 'Garbanzos con vegetales',
    price: 14.90,
    weight: 1500,
  },
  {
    id: 'b8c06803-a706-42a6-b413-502aefe21893',
    image: '',
    name: 'Pechuga de vegetales',
    price: 12.00,
    weight: 5000,
  },
  {
    id: '7010b03b-ff39-4c72-a6e2-be65ed42de5b',
    image: '',
    name: 'Bowl de frutos rojos',
    price: 10.00,
    weight: 200,
  },
  {
    id: '5c391800-94ec-478a-a85a-c9bf6dd79cd1',
    image: '',
    name: 'Tacos con lentejas',
    price: 15.00,
    weight: 150,
  },
  {
    id: 'f2c9e7b1-1c4a-4e8a-8e2e-9a7b2e8d9c3f',
    image: '',
    name: 'Sopa de verduras',
    price: 8.50,
    weight: 350,
  },
  {
    id: 'c3f1a2b4-5e6d-4a7f-8c2e-1f9d3e4b5a6b',
    image: '',
    name: 'Wrap de pollo y vegetales',
    price: 13.50,
    weight: 400,
  },
  {
    id: 'e2a1b7c9-3f4d-4e2a-9b7c-2d1f3e4a5b6c',
    image: '',
    name: 'Hamburguesa vegetariana',
    price: 16.00,
    weight: 350,
  },
];

const mainObj = {
  users,
  dishes,
  current: false
}

//? Here add the init program data
let db = new LocalDatabase();
// db.reset();
//! db.forceSet(mainObj);
db.setObj(mainObj);

const userController = {
  getbyId(id) { //TODO Implement cache in the db
    const users = db.get('users');
    return users ? users.find(user => user.id === id) : null;
  },
  update(id, newObj) {
    if (!newObj || newObj.id !== id) return false;
    const users = db.get('users') || false;
    if (users == false) return false;
    const idx = users.findIndex(user => user.id === id);
    if (idx === -1) return false;
    users[idx] = newObj;
    db.set('users', users);
    return true;
  },
  authLogin(email, password) {
    const users = db.get('users') || [];
    const user = users.find(u => u.email === email && u.password === password);
    console.log('User authlogin > ' + user);
    if (user) {
      db.set('current', user.id);
      return user;
    }
    return null;
  }
};
const dishController = {
  createTemplate(dishId, userId) {
    const user = db.get('users').find(u => u.id === userId);
    const dish = db.get('dishes').find(d => d.id === dishId);
    if (!user || !dish) return '';
    const isFavorite = user.favorites && user.favorites.includes(dishId);
    const cartItem = user.cart && user.cart.find(item => item.id === dishId);
    const inCart = !!cartItem;
    const quantity = cartItem ? cartItem.quantity : 0;
    const favoriteAction = `
      <div class="favorite_action">
        <svg class="icon heart ${isFavorite ? 'noselected disabled' : 'noselected'}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g></g><g></g><g> <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z" fill="#5e5c64"></path> </g></svg>
        <svg class="icon heart ${isFavorite ? 'selected' : 'selected disabled'}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g></g><g></g><g> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#e01b24"></path> </g></svg>
      </div>
    `;
    let cartAction = '';
    if (inCart) {
      cartAction = `
        <div class="action-container action-append">
          <svg class="icon decrease" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g></g><g></g><g> <path d="M6 12L18 12" stroke="#6cc51d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          <p class="label">${quantity}</p>
          <svg class="icon increase" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g></g><g></g><g> <path d="M6 12H18M12 6V18" stroke="#6cc51d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>
      `;
    } else {
      cartAction = `
        <div class="action-container action-newadd">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g></g><g></g><g> <path d="M3.86376 16.4552C3.00581 13.0234 2.57684 11.3075 3.47767 10.1538C4.3785 9 6.14721 9 9.68462 9H14.3153C17.8527 9 19.6214 9 20.5222 10.1538C21.4231 11.3075 20.9941 13.0234 20.1362 16.4552C19.5905 18.6379 19.3176 19.7292 18.5039 20.3646C17.6901 21 16.5652 21 14.3153 21H9.68462C7.43476 21 6.30983 21 5.49605 20.3646C4.68227 19.7292 4.40943 18.6379 3.86376 16.4552Z" stroke="#6cc51d" stroke-width="1.5"></path> <path opacity="0.5" d="M19.5 9.5L18.7896 6.89465C18.5157 5.89005 18.3787 5.38775 18.0978 5.00946C17.818 4.63273 17.4378 4.34234 17.0008 4.17152C16.5619 4 16.0413 4 15 4M4.5 9.5L5.2104 6.89465C5.48432 5.89005 5.62128 5.38775 5.90221 5.00946C6.18199 4.63273 6.56216 4.34234 6.99922 4.17152C7.43808 4 7.95872 4 9 4" stroke="#6cc51d" stroke-width="1.5"></path> <path d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4Z" stroke="#6cc51d" stroke-width="1.5"></path> </g></svg>
          <p class="label">Añadir al carrito</p>
        </div>
      `;
    }
    //! Dish image (placeholder if empty)
    const imageDiv = `<div class="dish_item-image">${dish.image ? `<img src="${dish.image}" alt="${dish.name}"/>` : ''}</div>`;
    return `
      <div class="dish_item" id="${dish.id}">
        ${favoriteAction}
        ${imageDiv}
        <p class="dish_item-price"><span>S/. </span>${dish.price.toFixed(2)}</p>
        <p class="dish_item-name">${dish.name}</p>
        <p class="dish_item-weight">${dish.weight} gr</p>
        <div class="dish_item-divider"></div>
        <div class="dish_item-add_cart-action">
          ${cartAction}
        </div>
      </div>
    `;
  },
  searchTemplate(dishObj) {
    if (!dishObj) return '';
    return `
      <div class="search_container-item" onclick="window.location.href='/dish?id=${dishObj.id}'">
        <div class="search_container-image">
          ${dishObj.image ? `<img src="${dishObj.image}" alt="${dishObj.name}"/>` : ''}
        </div>
        <p class="search_container-name">${dishObj.name}</p>
        <p class="search_container-price">S/. ${dishObj.price.toFixed(2)}</p>
      </div>
    `;
  },
  search(query) {
    const dishes = db.get('dishes') || [];
    if (!query || typeof query !== 'string') return [];
    const lowerQuery = query.trim().toLowerCase();
    if (!lowerQuery) return [];
    let results = dishes.filter(dish =>
      dish.name.toLowerCase().includes(lowerQuery)
    );
    function letterSimilarity(a, b) {
      const setA = new Set(a.replace(/\s/g, '').split(''));
      const setB = new Set(b.replace(/\s/g, '').split(''));
      const intersection = new Set([...setA].filter(x => setB.has(x)));
      const union = new Set([...setA, ...setB]);
      return intersection.size / union.size;
    }
    if (results.length === 0 && lowerQuery.length >= 2) {
      results = dishes.filter(dish => {
        const name = dish.name.toLowerCase();
        return letterSimilarity(name, lowerQuery) >= 0.2;
      });
    }
    return results;
  }
};

async function redirectAuth() {
  if (db.get('current') == false) {
    const path = window.location.pathname;
    if (path.endsWith('/auth/login.html') || path.endsWith('/auth/register.html')) {
      console.info('> Not redirection already in auth page');
      return;
    }
    else {
      window.location.href = '/auth/login.html';
      console.log('> Redirected from function parent');
      return;
    }
  }
}

redirectAuth();