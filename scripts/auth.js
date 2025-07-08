//? Login page
try {
  function _helperLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const response = userController.authLogin(email, password);
    console.log('After submit  >> ' + response);
    if (!response) {
      //TODO Implement error control
      console.log('Bad response');
    } else {
      window.location.href = "/";
      console.log(response);
    }
  }

  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    _helperLogin();
  });
  document.getElementById('login-btn').addEventListener('click', (e) => {
    e.preventDefault();
    _helperLogin();
  });
  document.getElementById('submit-input-login').addEventListener('submit', (e) => {
    e.preventDefault();
    _helperLogin();
  });
} catch (e) {
  console.log('> Error in login page auth/script' + e);
}

/* Old code from separates files
// Registro de sesion
function guardarUsuario() {

}

function validateForm(){

            const mail = document.getElementById("mail").value;
            const mailErr = document.getElementById("mail-error");

            const tel = document.getElementById("tel").value;
            const telErr = document.getElementById("tel-error");

            const pass = document.getElementById("pass").value;
            const passErr = document.getElementById("pass-error");

            passErr.textContent = "";
            mailErr.textContent = "";


            let isValid = true;
            if (pass === "" || pass.length < 8) {
                passErr.textContent = "La contraseña debe tener al menos 8 caracteres.";
                isValid = false;
            } 
            else if ( pass === "" || !/[A-Z]/.test(pass)) {
                passErr.textContent = "La contraseña debe contener al menos una letra mayúscula.";
                isValid = false;
            } 
            else if ( pass === "" || !/[a-z]/.test(pass)) {
                passErr.textContent = "La contraseña debe contener al menos una letra minúscula.";
                isValid = false;
            } 
            else if ( pass === "" || !/\d/.test(pass)) {
                passErr.textContent = "La contraseña debe contener al menos un número.";
                isValid = false;
            } 
            
            if (mail ==="" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
                mailErr.textContent = "Por favor, ingresa un correo electrónico válido.";
                isValid = false;
            }

            if (tel === "" || !/^\d{9}$/.test(tel)) {
                telErr.textContent = "Por favor, ingresa un número de teléfono válido (9 dígitos).";
                isValid = false;    
            }
   

            if (isValid) {
                let users = JSON.parse(localStorage.getItem('users') || '[]');
                users.push({ tel:tel, mail: mail, password: pass });
                localStorage.setItem('users', JSON.stringify(users));
    
                alert("Form submitted successfully!");
                window.location.href = "../inicio_sesion/inicio_sesion.html";
                return false;
            } else {
                return false; 
            }
            
        }

        function resetErrors(){
            document.getElementById("password-error").textContent = "";
            
        }


// Icicio de session
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
        { tel: '123546789', mail: 'joaquin@web.com', password: 'Hola1234' }
    ]));
}

function validateForm(){

            const mail = document.getElementById("mail").value;
            const mailErr = document.getElementById("mail-error");


            const pass = document.getElementById("password").value;
            const passErr = document.getElementById("password-error");

            passErr.textContent = "";
            mailErr.textContent = "";


            let isValid = true;
            if (pass === "" || pass.length < 8) {
                passErr.textContent = "La contraseña debe tener al menos 8 caracteres.";
                isValid = false;
            } 
            else if ( pass === "" || !/[A-Z]/.test(pass)) {
                passErr.textContent = "La contraseña debe contener al menos una letra mayúscula.";
                isValid = false;
            } 
            else if ( pass === "" || !/[a-z]/.test(pass)) {
                passErr.textContent = "La contraseña debe contener al menos una letra minúscula.";
                isValid = false;
            } 
            else if ( pass === "" || !/\d/.test(pass)) {
                passErr.textContent = "La contraseña debe contener al menos un número.";
                isValid = false;
            } 
          

            if (mail ==="" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
                mailErr.textContent = "Por favor, ingresa un correo electrónico válido.";
                isValid = false;
            }

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const foundUser = users.find(user => user.mail === mail);
            console.log(users);
            
            
            if (!foundUser) {
                mailErr.textContent = "Usuario no encontrado.";
                return false;
            }

            

            if (foundUser.password === pass) {
                alert("The credentials are correct!");
                window.location.href = "../home/Home_main.html";
                return false;
            } else {
                alert("Error en la confirmación!");
                passErr.textContent = "Contraseña incorrecta.";
                return false; 
            }

     
        }

        function resetErrors(){
            document.getElementById("password-error").textContent = "";
            
        }
*/