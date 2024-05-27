document.addEventListener('DOMContentLoaded', function() {
    const selProyectPerson = document.getElementById('selProyectPerson');
    const etiqueta = document.getElementById('etiqueta');

    // Desactiva el select de etiquetas al cargar la página
    etiqueta.disabled = true;

    // Añade un event listener para detectar cambios en selProyectPerson
    selProyectPerson.addEventListener('change', function() {
        if (selProyectPerson.value === "0") {
            etiqueta.disabled = false;
        } else {
            etiqueta.disabled = true;
        }
    });
});

function cargaGradoMaster(){
    const lang = sessionStorage.getItem('lang') || 'es';

    let urlG = `http://localhost:3000/:${lang}/studies/degree`;
    let urlM = `http://localhost:3000/:${lang}/studies/master`;

    fetch(urlG, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        fetch(urlM, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res2 => res2.json())
        .then(res2 => {
            console.log(res);
            console.log(res2);

            const selectEstudios = document.getElementById("estudios");
            res.response.forEach(element => {
                const opt = document.createElement("option");

                opt.setAttribute("value", `${element.id}`);
                opt.textContent = `${element.nombre}`;

                selectEstudios.appendChild(opt);
            });

            res2.response.forEach(element => {
                const opt = document.createElement("option");

                opt.setAttribute("value", `${element.id}`);
                opt.textContent = `${element.nombre}`;

                selectEstudios.appendChild(opt);
            })
        });
    });
}

function cargaEtiquetas(){
    const lang = sessionStorage.getItem('lang') || 'es';

    url = `http://localhost:3000/:${lang}/tag`;

    fetch(url, {
        method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
    }).then(res => res.json())
    .then(res => {
        console.log(res);

        const selectEtiquetas = document.getElementById("etiqueta");

        res.response.forEach(element => {
            const opt = document.createElement("option");

            opt.setAttribute("value", `${element.id}`);
            opt.textContent = `${element.texto}`;

            selectEtiquetas.appendChild(opt); 
        });
    });

}