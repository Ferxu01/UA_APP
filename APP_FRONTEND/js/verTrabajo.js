let url = "http://localhost:3000";
let i = 0;

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
                        let id_usu = r.response.usuario;
                        let allow_comments = r.response.comentarios;
                        console.log(id_usu);
                        console.log(allow_comments);

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
                        <div class="infotrabajo">
                            <img src="img/${r.response.imagen_portada}"class="portadaTrabajo" title="portada del trabajo">
                            <div>
                            
                                <p id="autor-receta"></p>
                                <p id="fecha-trabajo">${fechabuena}</p>
                                <div id="etiqs"></div>
                            </div>
                        </div>
                        <h2 class="descriptionHeader">Descripción</h2>
                        <section><article><p id="desc">${r.response.descripcion}</p></article></section>
                        <hr>
                        <h2 class="commentsHeader">Comentarios</h2>
                        <div id="dejarcomentario"></div>
                        <section id="coments"></section>
                        </div>
                        `;

                    document.querySelector('#trabajo-container').innerHTML = html;

                    
                    
                    nombreUsu(id_usu);
                    etiquetas();
                    verComentarios(allow_comments);
                    pedirForm(allow_comments);
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

// /tag/project/id
function etiquetas() {
    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('ID');

    if (ID) {
        fetch(`${url}/es/tag/project/${ID}`)
            .then(response => response.json())
            .then(r => {
                console.log(r);
                if (r.status === 200) {
                    let html = '';
                    //r.response.forEach(function (etiqueta) {
                        html += `<p>${r.response[0].texto}</p>`;
                    //});
                    document.querySelector('#etiqs').innerHTML += html;
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
            fetch(`${url}/project/${ID}/comments`)
                .then(response => response.json())
                .then(r => {
                    console.log(r);
                    if (r.status === 200) {
                        let html = '';
                        r.response.forEach(function (comentario) {
                            html+=`
                                <article>
                                <div class="comentario">
                                    <p>${comentario.nombre} ${comentario.apellidos}</p>
                                </div>
                                <div class="comentario2">
                                     <p>${comentario.texto}</p>
                                </div>
                                </article>
                            `;
                        });
                        document.querySelector('#coments').innerHTML += html;
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
        document.querySelector('#coments').innerHTML += html;
    }
}

//[SESSION] localStorage.getItem('[SESSION]')
function pedirForm(allcom){
    if(localStorage.getItem('[SESSION]')){
        let xhr= new XMLHttpRequest();
        if(allcom === 1){
            let url="formcomentario.html";
            xhr.open("GET",url,true);
            xhr.onload=function(){
            let html=xhr.responseText;
            document.querySelector('#dejarcomentario').innerHTML += html;
        }
    }
        xhr.send();
    }
    else{
        if(allcom === 1){
        let html=` <p>Para dejar un comentario tienes que  <a class="registrate" href="login.html">iniciar sesión</a></p>`;
        document.querySelector('#dejarcomentario').innerHTML += html; 
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    translateNav();
    translateViewProjectPage();
});