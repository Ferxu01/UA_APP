function cambiarEstilo() {
    var estiloCSS = document.getElementById('estilo-css');
    if (estiloCSS.href.includes('styles.css')) {
        estiloCSS.href = 'modo_oscuro.css';
        localStorage.setItem('estilo', 'oscuro');
    } else {
        estiloCSS.href = 'styles.css';
        localStorage.setItem('estilo', 'claro');
    }
}
