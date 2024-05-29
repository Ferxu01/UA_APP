let url = "http://localhost:3000";
let i = 0;
let screenWidth = window.innerWidth;
let id;

function miperfil() {
    if(localStorage.getItem('[SESSION]')){
        let usu = JSON.parse(localStorage.getItem('[SESSION]'));
        console.log(usu);
        let estud = usu.estudio;
        let html = '';
        let html2 = '';
        id = usu.id;

        if (!usu.imagen_perfil){
                    html2 += `<img src="./img/defaultprofile.png" id="profilePicture" class="profilePicture">`;
        }
        else{
                    html2 += `
                <img src="../APP_BACKEND/files/${usu.imagen_perfil}" id="profilePicture" class="profilePicture" alt="Imagen de usuario por defecto" width="100" title="Usuario">
                `;
        }

        html += `
                <article>
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
    
                </article>`;

        document.querySelector('#datos_perfil_usuario').innerHTML = html;
        document.querySelector('#foto_perfil_usuario').innerHTML = html2;

        nomestudios(estud);
        Trabajos();
    }
}

///studies/degree/{id}

function nomestudios(estud) {
    if (estud != 0) {
        let url = getRequestUrl(`/studies/degree/${estud}`);
        fetch(url)
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

function logout() {
    localStorage.removeItem('[SESSION]');
    localStorage.removeItem('[TOKEN]');
    location.href = 'index.html';
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


function changeProfilePicture(event) {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            const imgDataUrl = e.target.result;
            document.getElementById('profilePicture').src = imgDataUrl;

            const userId = id;
            const apiUrl = getRequestUrl(`/user/${userId}/avatar`);

            const obj = {
                'fileName': 'fotoperfil.png',
                'data': imgDataUrl
            }

            // Enviar la petición PATCH
            try {
                const response = await fetch(apiUrl, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('[TOKEN]')
                    },
                    body: JSON.stringify(obj)
                });

                const result = await response.json();
                console.log('Imagen de perfil actualizada:', result);

                let url = getRequestUrl(`/user/${userId}`);
                fetch(url, {
                    method: 'GET'
                })
                .then(res => res.json())
                .then(res => {
                    console.warn(res);
                    if(res.status == 200){
                        localStorage.setItem('[SESSION]', JSON.stringify(res.response));
                    }
                });

            } catch (error) {
                console.error('Error:', error);
            }
        };
        reader.readAsDataURL(file);
    }
}

