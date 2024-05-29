'use strict';

function setLanguage(lang) {
    localStorage.setItem('[LANG]', lang);
    
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