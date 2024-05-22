let url = "http://localhost:3000";
let i = 0;
let screenWidth = window.innerWidth;

function Trabajos() {
    fetch(`${url}/project`)
    .then(response => response.json())
    .then(r => {
        console.log(r);
        if (r.status == 200) {
            let html = '';
            let tam = r.response.length;

            let trabajosPorPagina = 1;
            if (screen.width > 400) {
                trabajosPorPagina = 3;
            }

            for (let j = 0; j < trabajosPorPagina; j++) {
                let currentIndex = (i + j) % tam; // Usamos el operador de módulo para obtener un comportamiento de "carrusel"
                let foto = r.response[currentIndex];
                html += `<article class="Trabajo">
                    <a href="verTrabajo.html?ID=${encodeURIComponent(foto.id)}">
                    <h3>${foto.titulo}</h3>
                    <div class="contenedor">
                    <img src="img/${foto.imagen_portada}"class="portadaTrabajo">
                    <img src="img/defaultprofile.png" alt="autor del trabajo"class="autorTrabajo">
                    <div>
                    </article>`;
            }

            document.querySelector('#ParaTi').innerHTML = html;
        }
    })
    .catch(error => console.error('Error:', error));
}

function Grados() {
    fetch(`${url}/studies/degree`)
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
    fetch(`${url}/studies/master`)
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
    fetch(`${url}/user`)
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

            for (let j = 0; j < fotosPorPagina; j++) {
                let currentIndex = (i + j) % tam; // Usamos el operador de módulo para obtener un comportamiento de "carrusel"
                let foto = r.response[currentIndex];
                html += `<article class="Usuario">
                <a href="user.html?ID=${encodeURIComponent(foto.id)}">
                <img src="img/${foto.imagen_perfil}"class="portadaTrabajo">
                <h3>${foto.nombre}</h3>
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

function cambiarEstilo() {
    var estiloCSS = document.getElementById('estilo-css');
    if (estiloCSS.href.includes('styles.css')) {
        estiloCSS.href = 'modo_oscuro.css';
    } else {
        estiloCSS.href = 'styles.css';
    }
}

