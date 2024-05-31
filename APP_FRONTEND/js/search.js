function busqueda(e){
    e.preventDefault();

    console.log('holi');
    
    //TODO: cambiar esta llamada
    
    const form = e.currentTarget,
    fd = new FormData(form);
    
    let obj = {
        title: fd.get("autor"),
        proyOrUser: parseInt(fd.get("selProyectPerson")),
        tag: parseInt(fd.get("etiqueta")),
        curso: parseInt(fd.get("estudios")),
        urlFind: getRequestUrl(`/project/find`)
    }

    console.warn(obj);

    if (obj.proyOrUser === 1) {
        let busqueda = obj.title.toLowerCase();
        //BUSCAR POR USUARIO
        let url = getRequestUrl(`/user`);
        fetch(url)
        .then(res => res.json())
        .then(resp => {
            console.log(resp);
            let usuarios = resp.response;
            //FILTRAR USUARIOS POR PARAMETRO
            usuarios = usuarios.filter(user => {
                return user.nombre.toLowerCase().includes(busqueda);
            });

            muestraRespuestaUsuarios(usuarios);
        });
    } else { //SI VALOR 'proyOrUser' ES 0
        let url = '';
        let urlCurso = getRequestUrl(`/studies/degree`);
        let esGrado = -1;
        let pu = "";

        if(!isNaN(obj.curso)){
            fetch(urlCurso, {
                method: 'GET',

            })
            .then(res => res.json())
            .then(res => {

                esGrado = encuentra(obj.curso, res.response); 

                url = creaURL(obj, esGrado);
                //TODO: añadir fetch de busqueda y montar resultado
                console.log(url);

                fetch(url, {
                    method: 'GET',
        
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    muestraRespuesta(res);
                });
            });
        }else{
            url = creaURL(obj, esGrado);

            //TODO: añadir fetch de busqueda y montar resultado
            console.log(url);
            fetch(url, {
                method: 'GET',

            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                muestraRespuesta(res);
            });
        }
    }
}

function muestraRespuestaUsuarios(usuarios) {
    const div = document.getElementById('respuestaBusqueda');
    div.innerHTML = '';
    let html = '';

    usuarios.forEach(user => {
        console.warn(user);
        html += `<article class="Usuario">
            <a href="user.html?ID=${encodeURIComponent(user.id)}">`;

        if (user.imagen_perfil === null)
            html += `<img src="./img/defaultprofile.png" class="profilePicture">`;
        else
            html += `<img src="../APP_BACKEND/files/${user.imagen_perfil}" class="profilePicture">`;
            
        html += `<h3>${user.nombre}</h3>
            </a></article>`;
    });

    div.innerHTML = html;
}


function muestraRespuesta(res){
    const div = document.getElementById("respuestaBusqueda");

    div.innerHTML = "";

    console.log(res.response);

    res.response.forEach(element => {
        const article = document.createElement('article');
        article.classList.add('Trabajo');

        const link = document.createElement('a');
        link.href = `verTrabajo.html?ID=${encodeURIComponent(element.id)}`;

        const title = document.createElement('h3');
        title.textContent = element.titulo;

        const contenedor = document.createElement('div');
        contenedor.classList.add('contenedor');

        const portadaImg = document.createElement('img');
        
        if (element.imagen_portada === '')
            portadaImg.src = `img/imagen_predefinida.png`;
        else
            portadaImg.src = `img/${element.imagen_portada}`;

        portadaImg.classList.add('portadaTrabajo');
        portadaImg.title = "portada del trabajo";

        const autorImg = document.createElement('img');
        autorImg.src = "img/defaultprofile.png";
        autorImg.alt = "autor del trabajo";
        autorImg.classList.add('autorTrabajo');
        autorImg.title = "autor del trabajo";

        link.appendChild(title);
        contenedor.appendChild(portadaImg);
        contenedor.appendChild(autorImg);
        link.appendChild(contenedor);
        article.appendChild(link);

        div.appendChild(article);
    });
}

function encuentra(id, lista) {
    for (let element of lista) {
        if (element.id === id) {
            return 0;
        }
    }
    return 1;
}

function creaURL(obj, esGrado){
    
    let url = getRequestUrl(`/project/find`);

    if(obj.title){
        if(obj.proyOrUser == 0){
            //proyecto
            url += `?p=${obj.title}`;
        }else{
            //usuarios
            url += `?u=${obj.title}`;
        }
    }

    if(obj.tag && obj.proyOrUser == 0){
        if(url == getRequestUrl(`/project/find`)){
            url += `?t=${obj.tag}`;
        }else{
            url += `&t=${obj.tag}`;
        }
    }

    if(esGrado != -1){
        let grado;
        if(esGrado == 0){
            grado = `d=${obj.curso}`;
        }else{
            grado = `m=${obj.curso}`;
        }

        if(url == getRequestUrl(`/project/find`)){
            url += '?' + grado;
        }else{
            url += '&' + grado;
        }
    }

    return url;
}

function cargaGradoMaster(){
    let urlG = getRequestUrl(`/studies/degree`);
    let urlM = getRequestUrl(`/studies/master`);
    
    fetch(urlG, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        fetch(urlM, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res2 => res2.json())
        .then(res2 => {
            
            const selectEstudios = document.getElementById("estudios");
            res.response.forEach(element => {
                const opt = document.createElement("option");
                
                opt.setAttribute("value", `${element.id}`);
                opt.setAttribute('class', 'optStudy');
                opt.textContent = `${element.nombre}`;
                
                selectEstudios.appendChild(opt);
            });
            
            res2.response.forEach(element => {
                const opt = document.createElement("option");
                
                opt.setAttribute("value", `${element.id}`);
                opt.setAttribute('class', 'optStudy');
                opt.textContent = `${element.nombre}`;
                
                selectEstudios.appendChild(opt);
            })
        });
    });
}

function cargaEtiquetas(){
    const lang = sessionStorage.getItem('lang') || 'es';
    
    url = getRequestUrl(`/tag`);
    
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(res => {
        
        const selectEtiquetas = document.getElementById("etiqueta");
        
        res.response.forEach(element => {
            const opt = document.createElement("option");
            
            opt.setAttribute("value", `${element.id}`);
            opt.textContent = `${element.texto}`;
            
            selectEtiquetas.appendChild(opt); 
        });
    });
    
}

function compruebaParams(){
    const urlParams = new URLSearchParams(window.location.search);
    const estudios = document.getElementById('estudios');
    const options = document.querySelectorAll('.optStudy');
    const form = document.querySelector('.formulario-busq');

    if(urlParams.has('d')){
        id = urlParams.get('d');
        console.log('ID: '+id);
        estudios.value = id;

        console.warn(options);
        console.warn(Array.from(estudios.children));

        // Llamar a la función buscar con un evento simulado
        // busqueda(new Event('submit', { bubbles: true, cancelable: true }));
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const selProyectPerson = document.getElementById('selProyectPerson');
    const etiqueta = document.getElementById('etiqueta');

    // Desactiva el select de etiquetas al cargar la página
    etiqueta.disabled = false;

    // Añade un event listener para detectar cambios en selProyectPerson
    selProyectPerson.addEventListener('change', function() {
        if (selProyectPerson.value === "0") {
            etiqueta.disabled = false;
        } else {
            etiqueta.value = ""; // Vuelve a la opción por defecto
            etiqueta.disabled = true;
        }
    });

    translateNav();
    translateSearchPage();
});
