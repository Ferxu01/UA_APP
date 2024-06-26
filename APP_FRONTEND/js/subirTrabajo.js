'use strict';

function agregaEtiqueta() {
    const input = document.getElementById('etiquetas');
    const tagText = input.value;
    console.log(tagText);

    actualizaEtiquetas(tagText);

    input.value = '';
}

function eliminarEtiqueta(button) {
    button.parentElement.remove();
    
    const tagsContainer = document.querySelector('.tagsContainer');
    if (tagsContainer.children.length <= 1) {
        tagsContainer.removeChild(tagsContainer.children[0]);
    }
}

function actualizaEtiquetas(tag) {
    let html = '';
    
    const tagsContainer = document.querySelector('.tagsContainer');
    if (tagsContainer.children.length === 0) {
        tagsContainer.insertAdjacentHTML('beforeend', `
            <label class="addedTagsLabel">Etiquetas añadidas:</label>
        `);
    }

    html = `
        <p class="opcionDatalist"><span class="tagName">${tag}</span><button onclick="eliminarEtiqueta(this)" type="button" data-id="${tag.id}">x</button></p>
    `;
    
    tagsContainer.insertAdjacentHTML('beforeend', html);
}

async function postFicheroATrabajo(idTrabajo, body) {
    let idFichero = 25;
    //const url = getRequestUrl(`/project/${idTrabajo}/files/${idFichero}`);
    const url = getRequestUrl(`/project/${idTrabajo}/files`);
    console.log(url);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('[TOKEN]')
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json());
}

async function postTagToProject(idTrabajo, idEtiqueta) {
    console.log(idTrabajo);
    console.log(idEtiqueta);
    const url = getRequestUrl(`/tag/${idEtiqueta}/project/${idTrabajo}`);
    return fetch(url, {
        method: 'PUT',
        headers: {
            'token': localStorage.getItem('[TOKEN]')
        }
    })
    .then(res => res.json());
}

async function postEtiqueta(body) {
    const url = getRequestUrl('/tag'); //En formato "/project/{id}"

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('[TOKEN]')
        }
    })
    .then(res => res.json());
}

async function postTrabajo(body) {
    const url = getRequestUrl('/project'); //En formato "/project/{id}"

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('[TOKEN]')
        }
    })
    .then(res => res.json());
}

async function subirTrabajo(e) {
    e.preventDefault();

    const form = e.currentTarget,
        fd = new FormData(form);
    
    const datalist = document.getElementById('lista-etiquetas');
    const opcion = document.querySelector('p.opcionDatalist');

    let existe = false;
    let idEtiqueta = null;

    if (opcion !== null) {
        const optDatalist = opcion.children[0];

        for (let i = 0; i < datalist.options.length && !existe; i++) {
            const option = datalist.options[i];
    
            if (optDatalist.textContent.toLowerCase() === option.value.toLowerCase()) {
                idEtiqueta = option.getAttribute('data-id');
                existe = true;
            }
        }

        if (idEtiqueta === null && !existe) {
            const objEtiqueta = {
                texto: optDatalist.textContent
            };
            const resp = await postEtiqueta(objEtiqueta);
            idEtiqueta = resp.response.id; // Id generado de la etiqueta
        }
    }
    
    //IMAGEN DE LA PORTADA (nombre del fichero con extension)
    let imagenPortada = fd.get('imagen_portada');
    
    const user = getSession();
    let objTrabajo = {
        titulo: fd.get('titulo'),
        imagen_portada: imagenPortada.name || '',
        comentarios: fd.get('sicom') || 0,
        descripcion: fd.get('descripcion'),
        usuario: parseInt(user.id),
        estudio: parseInt(user.estudio)
    };
    
    let idTrabajo = null;
    let trabajoSubido = false;

    if (document.querySelector('input[name="adjunto"]').files[0] !== undefined) {
        const resp = await postTrabajo(objTrabajo);

        if (resp.status === 200) {
            trabajoSubido = true;
            idTrabajo = resp.response.id;
            if (opcion !== null) {
                //AGREGAR LA ETIQUETA AL PROYECTO
                const res = await postTagToProject(idTrabajo, idEtiqueta);
            }

            let inputPortada = document.querySelector('input[name="imagen_portada"]');
            const filePortada = inputPortada.files[0];
            let inputImg = document.querySelector('input[name="adjunto"]');
            const file = inputImg.files[0];
            let base64String = null, base64StringPortada = null;
            let respTrabajo = null, respTrabajo2 = null;

            base64String = await convertirBase64(file);
            console.log(base64String);
            console.log(!base64String.error);

            if (!base64String.error) {
                const objFile = {
                    'descripcion': '',
                    'fileName': file.name,
                    'alternativo': 'Fichero del trabajo',
                    'data': base64String
                };
                respTrabajo = await postFicheroATrabajo(idTrabajo, objFile);
                console.log(respTrabajo);
            } else {
                if (getLanguage() === 'en')
                    ponMsgErr('No file has been attached to the project');
                else
                    ponMsgErr('No se ha adjuntado fichero al trabajo');
            }

            if (filePortada) {
                base64StringPortada = await convertirBase64(filePortada);

                const objFilePortada = {
                    'descripcion': '',
                    'fileName': filePortada.name,
                    'alternativo': 'Portada del trabajo',
                    'data': base64StringPortada,
                    'portada': true
                };

                respTrabajo2 = await postFicheroATrabajo(idTrabajo, objFilePortada);
            }

            if (respTrabajo !== null && respTrabajo.status === 200)
                location.href = 'profile.html';
        }
    } else {
        if (getLanguage() === 'en')
            ponMsgErr('You have to attach a project file');
        else
            ponMsgErr('Tienes que adjuntar un fichero del trabajo');
    }
}

function ponMsgErr(msg){
    const divErr = document.getElementsByClassName('cuadritoError');

    if (divErr.length > 0 && divErr[0].firstElementChild) {
        divErr[0].removeChild(divErr[0].firstElementChild);
    }

    const msgErr = document.createElement('p');
    msgErr.setAttribute('class', 'msgErr');
    msgErr.style = 'color: #000';

    msgErr.textContent = msg;

    divErr[0].appendChild(msgErr);
}

function convertirBase64(file) {
    return new Promise((resolve, reject) => {
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                // Datos de la imagen en base64
                const base64String = event.target.result;
                resolve(base64String);
            };

            reader.readAsDataURL(file);
        } else
            resolve({
                error: 'No existe el fichero'
            });
    });
}

async function obtenerEtiquetas() {
    const url = getRequestUrl('/tag');
    return fetch(url)
    .then(res => res.json());
}

document.addEventListener('DOMContentLoaded', async (event) => {
    var estilo = localStorage.getItem('estilo') || 'claro';
    var estiloCSS = document.getElementById('estilo-css');
    estiloCSS.href = estilo === 'oscuro' ? 'modo_oscuro.css' : 'styles.css';

    // Comprobar si el usuario está logueado
    let datosUsu = localStorage.getItem('[SESSION]');
    if (!datosUsu) {
        // Usuario no está logueado, redirigir a index.html
        window.location.href = 'index.html';
    }

    translateNav();
    translateUploadProjectPage();

    const etiquetas = await obtenerEtiquetas();

    const datalist = document.getElementById('lista-etiquetas');
    datalist.innerHTML = '';

    //Obtener etiquetas y mostrarlas en el datalist
    etiquetas.response.forEach(etiqueta => {
        const option = document.createElement('option');
        option.value = etiqueta.texto;
        option.setAttribute('data-id', etiqueta.id);
        datalist.appendChild(option);
    });
});