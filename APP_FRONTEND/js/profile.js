//let url = "http://localhost:3000";

function miperfil() {
    if(localStorage.getItem('[SESSION]')){
    	console.log(JSON.parse(localStorage.getItem('[SESSION]')));
        let usu = JSON.parse(localStorage.getItem('[SESSION]'));
        let estud = usu.estudio;
        let html = '';

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
                    <span class="dato">${usu.correo}</span>
    
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

        nomestudios(estud);
    }
}

///studies/degree/{id}

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

function logout() {
    localStorage.removeItem('[SESSION]');
    location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', (event) => {
    translateNav();
    translateProfilePage();
});