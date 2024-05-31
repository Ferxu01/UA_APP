let i = 0;

function descargaFichero(nombreFichero) {
    let url = `../APP_BACKEND/files/${nombreFichero}`;

    const link = document.createElement('a');
    link.href = url;
    link.download = 'archivo.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function trabajo() {
    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('ID');

    if (ID) {
        let url = getRequestUrl(`/project/${ID}`);
        fetch(url)
            .then(response => response.json())
            .then(r => {
                if (r.status === 200) {
                    aumentarVisitaTrabajo(ID);

                    let html = '';
                    //<p>${r.response.fecha}</p> falta añadir, no tienen propiedad fecha aun
                    let id_usu = r.response.usuario;
                    let allow_comments = r.response.comentarios;

                    const fecha = new Date(r.response.fecha);
                    const dia = String(fecha.getDate()).padStart(2, '0');
                    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
                    const año = fecha.getFullYear();

                    // Formatear la fecha como dd/mm/aaaa
                    let fechabuena = `${dia}/${mes}/${año}`;


                    html += `
                    <div class="cuadrotrabajo">
                    <div class="tituloyfecha">
                        <h1>${r.response.titulo}</h1>
                    </div>
                    <div class="infotrabajo">`;
                    if (r.response.imagen_portada === '')
                        html += `<img src="./img/imagen_predefinida.png"class="portadaTrabajo" title="portada del trabajo" class="portadaTrabajo2">`;
                    else
                        html += `<img src="../APP_BACKEND/files/portadas/${r.response.imagen_portada}" class="portadaTrabajo2" title="portada del trabajo" id="portada">`;
                    
                    html += `
                        <div id="projectInfo">
                            <p id="autor-receta"></p>
                            <p id="fecha-trabajo">${fechabuena}</p>
                            <p>${r.response.numVisitas} visitas</p>
                            <div id="etiqs"></div>
                        </div>
                    </div>

                    <div id="downloadFile"></div>

                    <h2 class="descriptionHeader">Descripción</h2>
                    <section id="proyectDesc">
                        <article>
                            <p id="desc">${r.response.descripcion}</p>
                        </article>
                    </section>
                    <hr>
                    <h2 class="commentsHeader">Comentarios</h2>
                    <div id="dejarcomentario"></div>
                    <section id="coments"></section>
                    </div>
                    `;

                    document.querySelector('#trabajo-container').innerHTML = html;

                    
                    botonMiLista(ID);
                    nombreUsu(id_usu);
                    etiquetas();
                    verComentarios(allow_comments);
                    pedirForm(allow_comments);

                    translateViewProjectPage(); // Para traducir los textos de comentario también
                }
        
            })
            .catch(error => console.error('Error:', error));
    } else {
        window.location.href = "index.html";
    }
}

function botonMiLista(id){
    if(localStorage.getItem('[SESSION]')){
        const sec = document.getElementById('proyectDesc');

        const button = document.createElement('button');
        button.setAttribute('id', 'addToList');
        button.textContent = "Añadir a mi lista";
        button.onclick = function() {
            addToList(id);
        };

        sec.appendChild(button);
    }
}

function addToList(r){
    
    ses = JSON.parse(localStorage.getItem('[SESSION]'));
    token = localStorage.getItem('[TOKEN]');

    console.log(r);
    console.log(ses);
    console.log(token);

    url = "http://localhost:3000/favList"

    obj = {
        'user': ses.id,
        'project': r 
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(obj)
    }).then(res => res.json())
    .then(res => {
        console.log(res);
    });

}

async function aumentarVisitaTrabajo(idTrabajo) {
    let url = getRequestUrl(`/project/${idTrabajo}/views`);
    return fetch(url, {
        method: 'PUT'
    });
}

function nombreUsu(id_usu) {
    if (id_usu != 0) {
        let url = getRequestUrl(`/user/${id_usu}`);
        fetch(url)
            .then(response => response.json())
            .then(r => {
                console.log(r);
                if (r.status === 200) {
                    let html = '';
                    html += r.response.nombre;
                    html += ' ';
                    html += r.response.apellidos;

                    document.querySelector('#autor-receta').innerHTML += html;
                }
            })
            .catch(error => console.error('Error:', error));
    }
}

// /tag/project/id
function etiquetas() {
    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('ID');

    if (ID) {
        let url = getRequestUrl(`/tag/project/${ID}`);
        fetch(url)
            .then(response => response.json())
            .then(r => {
                if (r.status === 200) {
                    if (Array.isArray(r.response)) {
                        let html = '';
                        r.response.forEach(function (etiqueta) {
                            html += `<p>${etiqueta.texto}</p>`;
                        });

                        document.querySelector('#etiqs').innerHTML += html;
                    }
                }
            })
            .catch(error => console.error('Error:', error));
    }
}

// Dame todos los comentarios  GET /project/{project-id}/comments
function verComentarios(allcom){
    if(allcom === 1){
        const urlParams = new URLSearchParams(window.location.search);
        const ID = urlParams.get('ID');

        if (ID) {
            let url = getRequestUrl(`/project/${ID}/comments`);
            fetch(url)
                .then(response => response.json())
                .then(r => {
                    console.log(r);
                    if (r.status === 200) {
                        if (Array.isArray(r.response)) {
                            let html = '';
                            r.response.forEach(function (comentario) {
                                html+=`
                                    <article class="vercoments">
                                    <div class="comentario">
                                        <p>${comentario.nombre} ${comentario.apellidos}</p>
                                    </div>
                                    <div class="comentario2">
                                        <p title="${comentario.texto}">${comentario.texto}</p>
                                    </div>
                                    </article>
                                `;
                            });
                            document.querySelector('#coments').innerHTML = html;
                        }
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }
    else{
        let html='';
        html+=`
            <article>
            <p class="disabledCommentsMsg">Esta publicación tiene los comentarios desactivados</p>
            </article>
        `;
        document.querySelector('#coments').innerHTML = html;
    }
}

//[SESSION] localStorage.getItem('[SESSION]')
function pedirForm(allcom){
    if(localStorage.getItem('[SESSION]')){
        if(allcom === 1){
            let xhr= new XMLHttpRequest();
            let url="formcomentario.html";
            xhr.open("GET",url,true);
            xhr.onload=function(){
                let html=xhr.responseText;
                document.querySelector('#dejarcomentario').innerHTML += html;
            }
            xhr.send();
        }
    }
    else{
        if(allcom === 1){
        let html=` <p>Para dejar un comentario tienes que  <a class="registrate" href="login.html">iniciar sesión</a></p>`;
        document.querySelector('#dejarcomentario').innerHTML += html; 
        }
    }
}

async function getFicheroTrabajo(idTrabajo) {
    let url = getRequestUrl(`/project/${idTrabajo}/files`);
    return fetch(url)
            .then(res => res.json());
}

document.addEventListener('DOMContentLoaded', async (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('ID');
    
    if (ID) {
        const res = await getFicheroTrabajo(ID);
        let nombreFichero = res.response[0].nombre;

        //Generar enlace de descarga del fichero
        let html = `<a id="descargar" onclick="descargaFichero('${nombreFichero}')">Descargar</a>`;
        document.querySelector('#projectInfo').innerHTML += html;
    }

    translateNav();
    translateViewProjectPage();
});



function dejarComentario(evt) {
    evt.preventDefault();
    const formulario = evt.currentTarget;
    const texto = formulario.elements['texto'].value;

    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('ID');

    const url = getRequestUrl(`/project/${ID}/comments`);

    const token = localStorage.getItem('[TOKEN]');
    const sesion = JSON.parse(localStorage.getItem('[SESSION]'));
    console.log(sesion);

    let obj = {
        texto: texto,
        id_usuario: parseInt(sesion.id)
    };

    if (token && texto) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(obj)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar el comentario');
            }
            return response.json();
        })
        .then(data => {
            // Manejar la respuesta del servidor
            console.log(data);
            if (data.status === 200) {
                // Actualizar sin recargar
                verComentarios(1);
                // Limpiar el formulario
                formulario.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Manejar el error, mostrar un mensaje al usuario, etc.
        });
    } else {
        console.error('Token o texto del comentario vacío');
        // Manejar el caso donde el token o el texto del comentario están vacíos
    }

    return false;
}
