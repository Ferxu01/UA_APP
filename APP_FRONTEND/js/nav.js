function mostrarMenu(){  //menu cambia en funcion de si usuario esta logeado o no
    let head = document.querySelector('#cabdec'),
        foot = document.querySelector('#navlow'),              
        pagina= document.body.getAttribute('data-pagina'),
        html1='',
        html2='';

    html2 += '<a href="index.html"><div> <span class="material-symbols-rounded">home</span><p id="navHome">Inicio</p></div></a>';

    if(pagina != 'buscar'){
        html2 += '<a href="buscar.html"><div><span class="material-symbols-rounded">search</span><p id="navSearch">Buscar</p></div></a>';
    }

    if(localStorage['[SESSION]']){
        if(pagina != 'nueva'){
            html1 += '<a href="subirTrabajo.html" class="subirtrabajo" id="navUploadProject">Subir Trabajo</a>';
        }
        if(pagina!= 'miperfil'){
            html1 += '<a href="profile.html" class="subirtrabajo" id="navMyProfile">Mi perfil</a>';
        }
        if(pagina!= 'milista'){
            html2 += '<a href="miLista.html"><div> <span class="material-symbols-rounded">add</span><p id="navMyList">Mi lista</p></div></a>';
        }
        
    }

    else{
    
        if(pagina != 'login'){
            html1 += '<a href="login.html" class="subirtrabajo" id="navLogin">Inicia sesión</a>';
        }
        
        if(pagina != 'registro'){
            html1 += '<a href="registro.html" class="subirtrabajo" id="navRegister">Regístrate</a>';
        }
    
    }

    html1+=' <button class="Estilo" onclick="cambiarEstilo()"><span class="material-symbols-rounded">dark_mode</span></button>';

    /*
    if(localStorage.getItem('[LANG]')) {
        let language = localStorage.getItem('[LANG]');
        if(language === "es"){
            html1+=' <button class="Estilo" onclick="setLanguage(\'en\')"><span class="material-symbols-rounded">language_us</span></button>';
        }
        else if(language === "en"){
            html1+=' <button class="Estilo" onclick="setLanguage(\'es\')"><span class="material-symbols-rounded">language_spanish</span></button>';
        }
    }
    */

    html1+= '<select class="subirtrabajo" id="miSelect" onchange="setLanguage(this.value)"><option value="" selected disabled>ES/EN</option> <option value="es">Español</option> <option value="en">English</option>  </select>'


    
    
    
    foot.innerHTML = html2;  //llamar en cada pagina que cambiemos
    head.innerHTML = html1;
}
    


