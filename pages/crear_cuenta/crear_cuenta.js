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
