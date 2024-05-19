let url = "http://localhost:3000";
let i = 0;
let screenWidth = window.innerWidth;

function fotos() {
    fetch(`${url}/project`)
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

function anterior() {
    if(i > 0){
        i--;
    }
    fotos();
    Grados();
    Masteres();
}

function siguiente() {
    i++;
    fotos();
    Grados();
    Masteres();
}

window.addEventListener('resize', function () {
    screenWidth = window.innerWidth;
    fotos(); // Llama a la función fotos() cuando cambia el tamaño de la pantalla
});


// function usuarios(){
//     const urlParams = new URLSearchParams(window.location.search);
//     const ID = urlParams.get('ID');

//     let xhr = new XMLHttpRequest();

//     xhr.open('GET', `${url}/studies/degree`, true);
//     xhr.responseType = 'json';

//     xhr.onload = function () {
//         let r = xhr.response;
//         console.log(r);
//         if (r.status == 200) {
//             let html = '';
//             let tam = r.response.length;

//             let fotosPorPagina = 1;
//             if (screenWidth > 400) {
//                 fotosPorPagina = 3;
//             }

//             for (let j = 0; j < fotosPorPagina; j++) {
//                 let currentIndex = (i + j) % tam; // Usamos el operador de módulo para obtener un comportamiento de "carrusel"
//                 let foto = r.response[currentIndex];
//                 html += `<article class="Grado">
//                     <h3>${foto.nombre}</h3>
//                     </article>`;
//             }

//             document.querySelector('#ParaTi').innerHTML = html;
//         }
//     }
//     xhr.send();
// }