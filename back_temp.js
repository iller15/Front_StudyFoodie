class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}


const users = [
    new User('Joaquin', 'joaquin@web.com', 'Hola1234')
];

function validateUser(){
    const mail = document.getElementById("mail").value;
    const mailErr = document.getElementById("mail-error");

    const pass = document.getElementById("password").value;
    const passErr = document.getElementById("password-error");

}