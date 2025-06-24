
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
            
/*
            if (mail ==="" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
                mailErr.textContent = "Por favor, ingresa un correo electrónico válido.";
                isValid = false;
            }*/

            const foundUser = users.find(user => user.email === mail);
            
            
            
            if (!foundUser) {
                mailErr.textContent = "Usuario no encontrado.";
                return false;
            }

            

            if (foundUser.password === pass) {
                alert("The credentials are correct!");
                window.location.href = "../cart_empty/cart_empty.html";
                
                return false;
            } else {
                alert("Error en la confirmación!");
                passErr.textContent = "Contraseña incorrecta.";

                return false; 
                }

            if (isValid) {
                alert("Form submitted successfully!");
                window.location.href = "../cart_empty/cart_empty.html";
                return false;
            } else {
                return false; 
            }
            
        }

        function resetErrors(){
            document.getElementById("password-error").textContent = "";
            
        }
