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

async function translateLoginPage() {
    const i18nFile = await getLangFile();

    document.title = i18nFile.pageTitle.login;
    const emailInput = document.querySelector('#usu');
    emailInput.placeholder = i18nFile.login.form.emailLabel;
    const passInput = document.querySelector('#pwd');
    passInput.placeholder = i18nFile.login.form.passwordLabel;
    const loginBtn = document.querySelector('button.btnLogin');
    loginBtn.textContent = i18nFile.login.loginBtn;

    const recoverPassLabel = document.querySelector('span.recoverPassLabel');
    recoverPassLabel.innerHTML = i18nFile.login.recoverPasswordLabel;
    const recoverPassLink = document.querySelector('a.recoverPassLink');
    recoverPassLink.textContent = i18nFile.login.recoverPasswordLink;

    const newAccountLabel = document.querySelector('span.newAccountLabel');
    newAccountLabel.textContent = i18nFile.login.newAccountLabel;
    const newAccountLink = document.querySelector('a.newAccountLink');
    newAccountLink.textContent = i18nFile.login.newAccountLink;
}

async function translateRegisterPage() {
    const i18nFile = await getLangFile();

    document.title = i18nFile.pageTitle.register;
    const nameInput = document.querySelector('#nombre');
    nameInput.placeholder = i18nFile.register.form.nameLabel;
    const surnameInput = document.querySelector('#apellidos');
    surnameInput.placeholder = i18nFile.register.form.surnameLabel;
    const studiesOption = document.querySelector('#estudios');
    studiesOption.textContent = i18nFile.register.form.studiesLabel;
    const courseOption = document.querySelector('#curso');
    courseOption.textContent = i18nFile.register.form.courseLabel;
    const emailInput = document.querySelector('#email');
    emailInput.placeholder = i18nFile.register.form.emailLabel;
    const passwordInput = document.querySelector('#pwd');
    passwordInput.placeholder = i18nFile.register.form.passwordLabel;
    const password2Input = document.querySelector('#pwd2');
    password2Input.placeholder = i18nFile.register.form.passwordConfirmLabel;

    const loginBtn = document.querySelector('button.btnRegister');
    loginBtn.textContent = i18nFile.register.registerBtn;
    const loginAccountLabel = document.querySelector('span.loginAccountLabel');
    loginAccountLabel.textContent = i18nFile.register.loginAccountLabel;
    const loginAccountLink = document.querySelector('a.loginAccountLink');
    loginAccountLink.textContent = i18nFile.register.loginAccountLink;
}

async function translateViewProjectPage() {
    const i18nFile = await getLangFile();

    document.title = i18nFile.pageTitle.viewProject;
    const descriptionHeader = document.querySelector('h2.descriptionHeader');
    descriptionHeader.textContent = i18nFile.viewProject.descriptionLabel;
    const commentsHeader = document.querySelector('h2.commentsHeader');
    commentsHeader.textContent = i18nFile.viewProject.commentsLabel;
    const disabledCommentsLabel = document.querySelector('p.disabledCommentsMsg');
    if (disabledCommentsLabel !== null)
        disabledCommentsLabel.textContent = i18nFile.viewProject.disabledCommentsLabel;
}

async function translateNav() {
    const i18nFile = await getLangFile();

    const navHome = document.querySelector('#navHome');
    navHome.textContent = i18nFile.footer.home;
    
    const navSearch = document.querySelector('#navSearch');
    if (navSearch !== null)
        navSearch.textContent = i18nFile.footer.search;
    
    const navUploadProject = document.querySelector('#navUploadProject');
    if (navUploadProject !== null)
        navUploadProject.textContent = i18nFile.header.uploadProject;

    const navMyProfile = document.querySelector('#navMyProfile');
    if (navMyProfile !== null)
        navMyProfile.textContent = i18nFile.header.myProfile;

    const navMyList = document.querySelector('#navMyList');
    if (navMyList !== null)
        navMyList.textContent = i18nFile.footer.myList;

    const navLogin = document.querySelector('#navLogin');
    if (navLogin !== null)
        navLogin.textContent = i18nFile.header.login;

    const navRegister = document.querySelector('#navRegister');
    if (navRegister !== null)
        navRegister.textContent = i18nFile.header.register;
}

async function translateUploadProjectPage() {
    const i18nFile = await getLangFile();

    document.title = i18nFile.pageTitle.uploadProject;
    const titleLabel = document.querySelector('.titleLabel');
    titleLabel.textContent = i18nFile.uploadProject.form.titleLabel;
    const titleInput = document.querySelector('#title');
    titleInput.placeholder = i18nFile.uploadProject.form.titleText;

    const imgLabel = document.querySelector('.imgLabel');
    imgLabel.textContent = i18nFile.uploadProject.form.imageLabel;
    const attachedFilesLabel = document.querySelector('.attachedFilesLabel');
    attachedFilesLabel.textContent = i18nFile.uploadProject.form.attachedFileLabel;

    const descriptionLabel = document.querySelector('.descripcionLabel');
    descriptionLabel.textContent = i18nFile.uploadProject.form.descriptionLabel;
    const descriptionInput = document.querySelector('#description');
    descriptionInput.placeholder = i18nFile.uploadProject.form.descriptionText;

    const tagsLabel = document.querySelector('.tagsLabel');
    tagsLabel.textContent = i18nFile.uploadProject.form.tagsLabel;
    const tagsText = document.querySelector('#etiquetas');
    tagsText.placeholder = i18nFile.uploadProject.form.tagsText;
    const addTagBtn = document.querySelector('.addTagBtn');
    addTagBtn.textContent = i18nFile.uploadProject.form.addTag;

    const addedTagsLabel = document.querySelector('.addedTagsLabel');
    if (addedTagsLabel !== null)
        addedTagsLabel.textContent = i18nFile.uploadProject.form.addedTagsLabel;

    const allowCommentsLabel = document.querySelector('.allowCommentsLabel');
    allowCommentsLabel.textContent = i18nFile.uploadProject.form.allowComments;

    const uploadProjectBtn = document.querySelector('.uploadProjectBtn');
    uploadProjectBtn.textContent = i18nFile.uploadProject.form.uploadProjectBtn;
}

async function translateProfilePage() {
    const i18nFile = await getLangFile();

    const pagina = document.body.getAttribute('data-pagina');
    if (pagina === 'usu') {
        document.title = i18nFile.pageTitle.profile;

        const userProfileHeader = document.querySelector('.userProfileHeader');
        userProfileHeader.textContent = i18nFile.profile.userProfileHeader;

        const userProfileProjectsHeader = document.querySelector('.userProfileProjectsHeader');
        userProfileProjectsHeader.textContent = i18nFile.profile.lastProjectsTitle;
    } else if (pagina === 'miperfil') {
        document.title = i18nFile.pageTitle.myProfile;

        const profileHeader = document.querySelector('.profileHeader');
        profileHeader.textContent = i18nFile.profile.profileHeader;

        const profileProjectsHeader = document.querySelector('.profileProjectsHeader');
        profileProjectsHeader.textContent = i18nFile.profile.myProjectsTitle;

        const editImgLink = document.querySelector('#editImgLink');
        editImgLink.textContent = i18nFile.profile.editImgLink;

        const signOutBtn = document.querySelector('#signOutBtn');
        signOutBtn.textContent = i18nFile.profile.signOutBtn;
    }

    const profileName = document.querySelector('.profileName');
    profileName.textContent = i18nFile.profile.nameLabel;

    const profileSurname = document.querySelector('.profileSurname');
    profileSurname.textContent = i18nFile.profile.surnameLabel;

    const profileEmail = document.querySelector('.profileEmail');
    profileEmail.textContent = i18nFile.profile.emailLabel;

    const profileStudies = document.querySelector('.profileStudies');
    profileStudies.textContent = i18nFile.profile.studiesLabel;

    const profileCourse = document.querySelector('.profileCourse');
    profileCourse.textContent = i18nFile.profile.courseLabel;
}

async function translateMyListPage() {
    const i18nFile = await getLangFile();

    document.title = i18nFile.pageTitle.myList;
    const myListHeader = document.querySelector('.myListHeader');
    myListHeader.textContent = i18nFile.myList.favouriteProjectsHeader;
}

async function translateSearchPage() {
    const i18nFile = await getLangFile();

    document.title = i18nFile.pageTitle.search;
    const enterSearchLabel = document.querySelector('.searchLabel');
    enterSearchLabel.textContent = i18nFile.search.form.enterSearchLabel;
    const searchInput = document.querySelector('.searchInput');
    searchInput.placeholder = i18nFile.search.form.enterSearchText;

    const selectProjectUserLabel = document.querySelector('.selectProjectUserLabel');
    selectProjectUserLabel.textContent = i18nFile.search.form.selectProjectUserLabel;
    const selectProjectUserOption = document.querySelector('.selectType');
    selectProjectUserOption.textContent = i18nFile.search.form.selectProjectUserText;

    const selectTagsLabel = document.querySelector('.selectTagsLabel');
    selectTagsLabel.textContent = i18nFile.search.form.selectTagsLabel;
    const selectTagOption = document.querySelector('.selectTagOption');
    selectTagOption.textContent = i18nFile.search.form.selectTagsText;
    
    const selectStudiesLabel = document.querySelector('.selectStudiesLabel');
    selectStudiesLabel.textContent = i18nFile.search.form.selectStudiesLabel;
    const selectStudyOption = document.querySelector('.selectStudyOption');
    selectStudyOption.textContent = i18nFile.search.form.selectStudiesText;

    const searchBtn = document.querySelector('#buscar');
    searchBtn.value = i18nFile.search.form.searchBtn;
}