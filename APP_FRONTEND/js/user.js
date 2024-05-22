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
                    let usu = r.response;

                    html += `<article>
	                    <span>Nombre:</span>
	                    <span class="dato">${usu.nombre}</span>
	                </article>
	                <article>
	                    <span>Apellidos:</span>
	                    <span class="dato">${usu.apellidos}</span>
	                </article>
	                <article>
	                    <span>Email:</span>
	                    <span class="dato">${usu.correo}</span>
	    
	                </article>
	                <article>
	                    <span>Estudios:</span>
	                    <span id="estud" class="dato"></span>
	    
	                </article>
	                <article>
	                    <span>Curso:</span>
	                    <span class="dato">${usu.curso}</span>
	    
	                </article>

                    `;

                    document.querySelector('#datos_user').innerHTML = html;

                    
                    
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