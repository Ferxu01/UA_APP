let url = "http://localhost:3000";
let i = 0;
let id_usu;

function trabajo() {
    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('ID');

    if (ID) {
        fetch(`${url}/project/${ID}`)
            .then(response => response.json())
            .then(r => {
                console.log(r);
                if (r.status === 200) {
                    let html = '';
                        //<p>${r.response.fecha}</p> falta añadir, no tienen propiedad fecha aun
                        id_usu = r.response[0].usuario;
                        console.log(id_usu);
                        html += `
                        <div class="tituloyfecha">
                            <h1>${r.response[0].titulo}</h1>
                        </div>
                        <div class="infotrabajo">
                            <img src="img/${r.response[0].imagen_portada}"class="portadaTrabajo">
                            <div>
                                <p id="autor-receta">Autor: </p>
                            </div>
                        </div>
                        <h2>Descripción</h2>
                        <p id="desc">${r.response[0].descripcion}</p>
                        <h2>Comentarios</h2>
                        <div id="dejarcomentario"></div>
                        <section id="coments"></section>
                        `;

                    document.querySelector('#trabajo-container').innerHTML = html;

                    //verComentarios();
                    //pedirForm();
                    nombreUsu(id_usu);
                }
        
            })
            .catch(error => console.error('Error:', error));
    } else {
        window.location.href = "index.html";
    }
}

function nombreUsu(id_usu) {
    let url = "http://localhost:3000";
    if (id_usu != 0) {
        fetch(`${url}/user/${id_usu}`)
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

/*
function ingredientes() {
    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('ID');

    let url = `api/recetas/${ID}/ingredientes`;

    fetch(url)
        .then(response => response.json())
        .then(r => {
            if (r.RESULTADO === 'OK') {
                let html = '';
                r.FILAS.forEach(function (ingrediente) {
                    html += `<li><p>${ingrediente.texto}</p></li>`;
                });
                document.querySelector('#ing').innerHTML += html;
            }
        })
        .catch(error => console.error('Error:', error));
}

function etiquetas() {
    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('ID');

    let url = `api/recetas/${ID}/etiquetas`;

    fetch(url)
        .then(response => response.json())
        .then(r => {
            if (r.RESULTADO === 'OK') {
                let html = '';
                r.FILAS.forEach(function (etiqueta) {
                    let nombre = encodeURIComponent(etiqueta.nombre);
                    html += `<p><a href="buscar.html?e=${nombre}">${etiqueta.nombre}</a></p>`;
                });
                document.querySelector('#etiqs').innerHTML += html;
            }
        })
        .catch(error => console.error('Error:', error));
}

function pasos() {
    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('ID');

    let url = `api/recetas/${ID}`;

    fetch(url)
        .then(response => response.json())
        .then(r => {
            if (r.RESULTADO === 'OK') {
                let html = '';
                var pasos = r.FILAS[0].elaboracion.split("<br>");
                pasos.forEach(function (paso) {
                    html += `<li>${paso}</li>`;
                });
                document.querySelector('#pasos').innerHTML += html;
            }
        })
        .catch(error => console.error('Error:', error));
}

function fotos() {
    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('ID');

    let url = `api/recetas/${ID}/fotos`;

    fetch(url)
        .then(response => response.json())
        .then(r => {
            if (r.RESULTADO === 'OK') {
                let html = '';
                let tam = r.FILAS.length - 1;

                if (i < 0) {
                    i = tam;
                }
                if (i > tam) {
                    i = 0;
                }

                let foto = r.FILAS[i];
                html += `<div><img src="fotos/${foto.archivo}" class="pollo2" alt="foto"></div>`;
                html += `<p>${foto.descripcion}</p>`;

                document.querySelector('#fotos').innerHTML = html;
            }
        })
        .catch(error => console.error('Error:', error));
}

function anterior() {
    i--;
    fotos();
}

function siguiente() {
    i++;
    fotos();
}
*/