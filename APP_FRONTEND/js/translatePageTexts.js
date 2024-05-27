'use strict';

async function translateIndexPage() {
    const i18nFile = await getLangFile();
    
    document.title = i18nFile.pageTitle.home;
    const forYouHeader = document.querySelector('h3.forYou');
    forYouHeader.textContent = i18nFile.index.forYou;
    const mostVisitedHeader = document.querySelector('h3.mostVisited');
    mostVisitedHeader.textContent = i18nFile.index.mostVisited;
    const degreeHeader = document.querySelector('h3.degreeHeader');
    degreeHeader.textContent = i18nFile.index.degrees;
    const masterHeader = document.querySelector('h3.masterHeader');
    masterHeader.textContent = i18nFile.index.masters;
    const featuredUserHeader = document.querySelector('h3.featuredUsers');
    featuredUserHeader.textContent = i18nFile.index.featuredUsers;
}