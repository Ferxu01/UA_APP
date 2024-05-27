'use strict';

function isLogged() {
    return sessionStorage.getItem('[SESSION]') && sessionStorage.getItem('[TOKEN]');
}