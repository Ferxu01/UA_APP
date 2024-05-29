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

document.addEventListener('DOMContentLoaded', event => {
    if (!localStorage.getItem('[LANG]'))
        setLanguage('es');

    let desplegable = document.querySelector('#miSelect');
    let lang = localStorage.getItem('[LANG]');
    Array.from(desplegable.options).forEach(option => {
        if (option.value === lang)
            option.selected = true;
    });
});
