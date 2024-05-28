'use strict';

function isLogged() {
    return localStorage.getItem('[SESSION]') && localStorage.getItem('[TOKEN]');
}

function getSession() {
    const session = localStorage.getItem('[SESSION]');

    if (session)
        return JSON.parse(session);

    return null;
}