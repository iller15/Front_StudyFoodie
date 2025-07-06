let currentUser = userController.getbyId(db.get('current'));


//? Section for account index page
try {
  const user_image = document.getElementById('user-image');
  user_image.src = currentUser.image;
  const user_name = document.getElementById('user-name');
  user_name.textContent = currentUser.name;
  const user_email = document.getElementById('user-email');
  user_email.textContent = currentUser.email;
}
catch {
  console.log('Error in account index page');
}


//? Section for account me page
try {
  const user_name_change = document.getElementById('user_name-change');
  user_name_change.value = currentUser.name;
  const user_email_change = document.getElementById('user_email-change');
  user_email_change.value = currentUser.email;
  const user_phone_change = document.getElementById('user_phone-change');
  user_phone_change.value = currentUser.phone;

  document.getElementById('save-button').addEventListener('click', () => {
    currentUser.name = user_name_change.value;
    currentUser.email = user_email_change.value;
    currentUser.phone = user_phone_change.value;
    //? Why is passing the id double?
    //? is for control and not forcing the updating, suring of the correct obj in the array of users
    userController.update(currentUser.id, currentUser);
  });
  
  //TODO Implement the change password logic
}
catch {
  console.log('Error in account me page');
}