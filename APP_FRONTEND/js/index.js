let url = "http://localhost:3000";
let i = 0;
let screenWidth = window.innerWidth;

function fotos() {
    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('ID');

    let xhr = new XMLHttpRequest();

    xhr.open('GET', `${url}/studies/degree`, true);
    xhr.responseType = 'json';

    xhr.onload = function () {
        let r = xhr.response;
        console.log(r);
        if (r.status == 200) {
            let html = '';
            let tam = r.response.length - 1;

            if (i < 0) {
                i = tam;
            }
            if (i > tam) {
                i = 0;
            }

            let fotosPorPagina = 1;
            if (screenWidth > 400) {
                fotosPorPagina = 3;
            }

            for (let j = 0; j < fotosPorPagina; j++) {
                let currentIndex = i + j;
                if (currentIndex <= tam) {
                    let foto = r.response[currentIndex];
                    html += `<article class="Grado">
                        <h3>${foto.nombre}</h3>
                        </article>`;
                }
            }

            document.querySelector('#ParaTi').innerHTML = html;
        }
    }
    xhr.send();
}

function anterior() {
    i--;
    fotos();
}

function siguiente() {
    i++;
    fotos();
}

window.addEventListener('resize', function () {
    screenWidth = window.innerWidth;
    fotos(); // Llama a la función fotos() cuando cambia el tamaño de la pantalla
});