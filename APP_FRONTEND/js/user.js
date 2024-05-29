url = "http://localhost:3000";

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