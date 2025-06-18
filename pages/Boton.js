// js/boton-simple.js
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el botón por su ID
    const botonSimple = document.getElementById('miBotonSimple');
    
    // Añade un event listener para el clic
    botonSimple.addEventListener('click', function() {
        // Cambia el texto del botón
        this.textContent = '¡Funciona!';
        
        // Cambia el color de fondo temporalmente
        this.style.backgroundColor = '#4CAF50';
        
        // Muestra un mensaje en la consola
        console.log('Botón simple clickeado');
        
        // Vuelve al estado original después de 1 segundo
        setTimeout(() => {
            this.textContent = 'Botón Simple';
            this.style.backgroundColor = '';
        }, 1000);
    });
});