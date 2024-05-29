let url = "http://localhost:3000";
let i = 0;
let screenWidth = window.innerWidth;

function Trabajos() {
    // const divTrabajos = document.querySelector('#ParaTi');
    // divTrabajos.innerHTML = '';
    let url = getRequestUrl('/project');
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

            document.querySelector('#ParaTi').innerHTML = html;
        }
    })
    .catch(error => console.error('Error:', error));
}

function Grados() {
    let url = getRequestUrl('/studies/degree');
    fetch(url)
    .then(response => response.json())
    .then(r => {
        console.log(r);
        if (r.status == 200) {
            let html = '';
            let tam = r.response.length;

            let fotosPorPagina = 1;
            if (screen.width > 400) {
                fotosPorPagina = 3;
            }

            if (tam < fotosPorPagina) {
                fotosPorPagina = tam;
            }

            for (let j = 0; j < fotosPorPagina; j++) {
                let currentIndex = (i + j) % tam; // Usamos el operador de módulo para obtener un comportamiento de "carrusel"
                let foto = r.response[currentIndex];
                html += `<article class="Grado">
                    <h3>${foto.nombre}</h3>
                    </article>`;
            }

            document.querySelector('#Grados').innerHTML = html;
        }
    })
    .catch(error => console.error('Error:', error));
}

function Masteres() {
    let url = getRequestUrl('/studies/master');
    fetch(url)
    .then(response => response.json())
    .then(r => {
        console.log(r);
        if (r.status == 200) {
            let html = '';
            let tam = r.response.length;

            let fotosPorPagina = 1;
            if (screen.width > 400) {
                fotosPorPagina = 3;
            }

            if (tam < fotosPorPagina) {
                fotosPorPagina = tam;
            }

            for (let j = 0; j < fotosPorPagina; j++) {
                let currentIndex = (i + j) % tam; // Usamos el operador de módulo para obtener un comportamiento de "carrusel"
                let foto = r.response[currentIndex];
                html += `<article class="Grado">
                    <h3>${foto.nombre}</h3>
                    </article>`;
            }

            document.querySelector('#Masteres').innerHTML = html;
        }
    })
    .catch(error => console.error('Error:', error));
}

function Usuario() {
    let url = getRequestUrl('/user');
    fetch(url)
    .then(response => response.json())
    .then(r => {
        console.log(r.response);
        if (r.status == 200) {
            let html = '';
            let tam = r.response.length;

            let fotosPorPagina = 1;
            if (screen.width > 400) {
                fotosPorPagina = 3;
            }

            if (tam < fotosPorPagina) {
                fotosPorPagina = tam;
            }

            for (let j = 0; j < fotosPorPagina; j++) {
                let currentIndex = (i + j) % tam; // Usamos el operador de módulo para obtener un comportamiento de "carrusel"
                let foto = r.response[currentIndex];

                

                html += `<article class="Usuario">
                <a href="user.html?ID=${encodeURIComponent(foto.id)}">`;

                if (foto.imagen_perfil === null)
                    html += `<img src="./img/defaultprofile.png"class="profilePicture">`;
                else
                    html += `<img src="../APP_BACKEND/files/${foto.imagen_perfil}"class="profilePicture">`;
                
                html += `<h3>${foto.nombre}</h3>
                </a>
                    </article>`;
            }

            document.querySelector('#Usuarios').innerHTML = html;
        }
    })
    .catch(error => console.error('Error:', error));
}

function anteriorGrado() {
    if(i > 0){
        i--;
    }
    Grados();
}
function siguienteGrado() {
    i++;
    Grados();
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

function anteriorMaster() {
    if(i > 0){
        i--;
    }
    Masteres();
}

function siguienteMaster() {
    i++;
    Masteres();
}

function anteriorUsuario() {
    if(i > 0){
        i--;
    }
    Usuario();
}

function siguienteUsuario() {
    i++;
    Usuario();
}

window.addEventListener('resize', function () {
    screenWidth = window.innerWidth;
    Trabajos(); // Llama a la función fotos() cuando cambia el tamaño de la pantalla
    Grados();
    Masteres();
    Usuario();
});