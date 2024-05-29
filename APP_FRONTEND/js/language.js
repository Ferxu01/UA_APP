'use strict';

function setLanguage(lang) {
    localStorage.setItem('[LANG]', lang);

    let pagina = document.querySelector('body').getAttribute('data-pagina');

    translateNav();
    if (pagina === 'index')
        translateIndexPage();
    else if (pagina === 'buscar')
        translateSearchPage();
    else if (pagina === 'login')
        translateLoginPage();
    else if (pagina === 'milista')
        translateMyListPage();
    else if (pagina === 'miperfil' || pagina === 'usu')
        translateProfilePage();
    else if (pagina === 'registro')
        translateRegisterPage();
    else if (pagina === 'nueva')
        translateUploadProjectPage();
    else if (pagina === 'viewTrabajo')
        translateViewProjectPage();
}

function getLanguage() {
    return localStorage.getItem('[LANG]') || 'es';
}

async function getLangFile() {
    return fetch(`../APP_FRONTEND/i18n/${getLanguage()}.json`)
    .then(res => res.json());
}

function getRequestUrl(url) {
    const lang = getLanguage();
    return `http://localhost:3000/${lang}${url}`;
}