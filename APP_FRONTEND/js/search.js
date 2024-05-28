document.addEventListener('DOMContentLoaded', function() {
    translateNav();
    translateSearchPage();

    const selProyectPerson = document.getElementById('selProyectPerson');
    const etiqueta = document.getElementById('etiqueta');

});

function busqueda(e){
    e.preventDefault();
    
    //TODO: cambiar esta llamada
    const lang = sessionStorage.getItem('lang') || 'es';
    
    const form = e.currentTarget,
    fd = new FormData(form);
    
    let obj = {
        title: fd.get("autor"),
        proyOrUser: parseInt(fd.get("selProyectPerson")),
        tag: parseInt(fd.get("etiqueta")),
        curso: parseInt(fd.get("estudios")),
        urlFind: 'http://localhost:3000/project/find'
    }


    let url = '';
    let urlCurso = 'http://localhost:3000/studies/degree';
    let esGrado = -1;
    let pu = "";

    if(obj.curso){
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


function muestraRespuesta(res){
    const div = document.getElementById("respuestaBusqueda");

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
    
    let url = "http://localhost:3000/project/find";

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
        if(url == "http://localhost:3000/project/find"){
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

        if(url == "http://localhost:3000/project/find"){
            url += '?' + grado;
        }else{
            url += '&' + grado;
        }
    }

    return url;
}

function cargaGradoMaster(){
    const lang = sessionStorage.getItem('lang') || 'es';
    
    let urlG = `http://localhost:3000/:${lang}/studies/degree`;
    let urlM = `http://localhost:3000/:${lang}/studies/master`;
    
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
                opt.textContent = `${element.nombre}`;
                
                selectEstudios.appendChild(opt);
            });
            
            res2.response.forEach(element => {
                const opt = document.createElement("option");
                
                opt.setAttribute("value", `${element.id}`);
                opt.textContent = `${element.nombre}`;
                
                selectEstudios.appendChild(opt);
            })
        });
    });
}

function cargaEtiquetas(){
    const lang = sessionStorage.getItem('lang') || 'es';
    
    url = `http://localhost:3000/:${lang}/tag`;
    
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
});