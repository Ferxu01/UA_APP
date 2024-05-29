url = "http://localhost:3000";
let i = 0;
let id = 0;

function usuario() {
	const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('ID');

    if (ID) {
        fetch(`${url}/user/${ID}`)
            .then(response => response.json())
            .then(r => {
                console.log(r);
                if (r.status === 200) {
                    let html = '';
                    let html2 = '';
                    let usu = r.response;
                    console.log(usu);
                    id = usu.id;
                    console.log(id);

                   if (!usu.imagen_perfil){
                                html2 += `<img src="./img/defaultprofile.png" id="profilePicture" class="profilePicture">`;
                    }
                    else{
                                html2 += `
                            <img src="../APP_BACKEND/files/${usu.imagen_perfil}" id="profilePicture" class="profilePicture" alt="Imagen de usuario por defecto" width="100" title="Usuario">
                            `;
                    }

                    html += `<article>
	                    <span class="profileName">Nombre:</span>
	                    <span class="dato">${usu.nombre}</span>
	                </article>
	                <article>
	                    <span class="profileSurname">Apellidos:</span>
	                    <span class="dato">${usu.apellidos}</span>
	                </article>
	                <article>
	                    <span class="profileEmail">Email:</span>
	                    <span class="dato">${usu.email}</span>
	    
	                </article>
	                <article>
	                    <span class="profileStudies">Estudios:</span>
	                    <span id="estud" class="dato"></span>
	    
	                </article>
	                <article>
	                    <span class="profileCourse">Curso:</span>
	                    <span class="dato">${usu.curso}</span>
	    
	                </article>
                    

                    `;

                    document.querySelector('#datos_user').innerHTML = html;
                    document.querySelector('#foto_perfil_usuario').innerHTML = html2;

                    
                    
                    nomestudios(usu.estudio);
                    Trabajos();
                }
        
            })
            .catch(error => console.error('Error:', error));
    } else {
        window.location.href = "index.html";
    }
}

function nomestudios(estud) {
    let url = "http://localhost:3000";
    if (estud != 0) {
        fetch(`${url}/studies/degree/${estud}`)
            .then(response => response.json())
            .then(r => {
                console.log(r);
                if (r.status === 200) {
                    let html = '';
                    html += r.response.nombre;

                    document.querySelector('#estud').innerHTML = html;
                }
            })
            .catch(error => console.error('Error:', error));
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    translateNav();
    translateProfilePage();
});

function Trabajos() {
    // const divTrabajos = document.querySelector('#ParaTi');
    // divTrabajos.innerHTML = '';
    let url = getRequestUrl('/project');
    const userid = id;
    fetch(url)
    .then(response => response.json())
    .then(r => {
        console.log(r.response);
        if (r.status == 200) {
            let html = '';
            let tam = r.response.length;

            let trabajosPorPagina = 1;
            if (screen.width > 767 && screen.width<=1023) {
                trabajosPorPagina = 4;
            }
            if (screen.width > 1023) {
                trabajosPorPagina = 9;
            }

            if (tam < trabajosPorPagina) {
                trabajosPorPagina = tam;
            }

            for (let j = 0; j < trabajosPorPagina; j++) {
                let currentIndex = (i + j) % tam; // Usamos el operador de módulo para obtener un comportamiento de "carrusel"
                let foto = r.response[currentIndex];
                if(foto.usuario === userid){
                    html += `<article class="Trabajo">
                        <a href="verTrabajo.html?ID=${encodeURIComponent(foto.id_trabajo)}">
                        <h3 title="${foto.titulo}">${foto.titulo}</h3>
                        <div class="contenedor">`;

                    if (foto.imagen_portada === '')
                        html += `<img src="./img/imagen_predefinida.png"class="portadaTrabajo" title="Portada del trabajo">`;
                    else
                        html += `<img src="../APP_BACKEND/files/portadas/${foto.imagen_portada}"class="portadaTrabajo" title="Portada del trabajo">`;

                    if (foto.imagen_perfil === null)
                        html += `<img src="img/defaultprofile.png" alt="autor del trabajo"class="autorTrabajo" title="autor del trabajo">`;
                    else
                        html += `<img src="../APP_BACKEND/files/${foto.imagen_perfil}" alt="autor del trabajo"class="autorTrabajo" title="autor del trabajo">`;


                    html += `</div>
                        </article>`;
                }
            }

            document.querySelector('#ParaTi').innerHTML = html;
        }
    })
    .catch(error => console.error('Error:', error));
}

function anteriorTrabajo() {
    if(i > 0){
        i--;
    }
    Trabajos();
}

function siguienteTrabajo() {
    i++;
    Trabajos();
}