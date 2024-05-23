function mostrarMenu(){  //menu cambia en funcion de si usuario esta logeado o no
    let head = document.querySelector('#cabdec'),
        foot = document.querySelector('#navlow'),              
        pagina= document.body.getAttribute('data-pagina'),
        html1='',
        html2='';

    html2 += '<a href="index.html"><div> <span class="material-symbols-rounded">home</span><p>Inicio</p></div></a>';

    if(pagina != 'buscar'){
        html2 += '<a href="buscar.html"><div><span class="material-symbols-rounded">search</span><p>Buscar</p></div></a>';
    }

    if(localStorage['[SESSION]']){
        if(pagina != 'nueva'){
            html1 += '<a href="subirTrabajo.html" class="subirtrabajo">Subir Trabajo</a>';
        }
        if(pagina!= 'miperfil'){
            html1 += '<a href="profile.html" class="subirtrabajo">Mi perfil</a>';
        }
        if(pagina!= 'milista'){
            html2 += '<a href="miLista.html"><div> <span class="material-symbols-rounded">add</span><p>Mi lista</p></div></a>';
        }
        
    }

    else{
    
        if(pagina != 'login'){
            html1 += '<a href="login.html" class="subirtrabajo">Inicia sesión</a>';
        }
        
        if(pagina != 'registro'){
            html1 += '<a href="registro.html" class="subirtrabajo">Regístrate</a>';
        }
    
    }

    html1+=' <button class="Estilo" onclick="cambiarEstilo()"><span class="material-symbols-rounded">dark_mode</span></button>';
    
    
    
    foot.innerHTML = html2;  //llamar en cada pagina que cambiemos
    head.innerHTML = html1;
}
    


