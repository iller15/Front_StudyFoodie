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