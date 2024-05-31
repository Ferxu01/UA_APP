'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
    translateNav();
    translateMyListPage();
});

function cargaLista(){
    let ses = JSON.parse(localStorage.getItem('[SESSION]'));
    let token = localStorage.getItem('[TOKEN]'); 
    let url = `http://localhost:3000/favList/${ses.id}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    }).then(res => res.json())
    .then(res => {
        console.log(res);
        muestraTrabajos(res);
    });
}

function muestraTrabajos(r) {
    const respuestaBusqueda = document.getElementById("divMilista");
    respuestaBusqueda.innerHTML = ''; // Limpiar el contenido existente

    r.response.forEach(foto => {
        // Crear el elemento 'article'
        const article = document.createElement('article');
        article.classList.add('Trabajo');
        article.dataset.id = foto.id_trabajo; // Añadir el atributo data-id

        // Crear el enlace
        const link = document.createElement('a');
        link.href = `verTrabajo.html?ID=${encodeURIComponent(foto.id_trabajo)}`;

        // Crear el título
        const title = document.createElement('h3');
        title.textContent = foto.titulo;
        title.title = foto.titulo;

        // Crear el contenedor
        const contenedor = document.createElement('div');
        contenedor.classList.add('contenedor');

        // Crear la imagen de portada
        const portadaImg = document.createElement('img');
        portadaImg.classList.add('portadaTrabajo');
        portadaImg.title = "Portada del trabajo";
        portadaImg.alt = "portada del trabajo";
        if (foto.imagen_portada === '') {
            portadaImg.src = "./img/imagen_predefinida.png";
        } else {
            portadaImg.src = `../APP_BACKEND/files/portadas/${foto.imagen_portada}`;
        }

        // Crear la imagen de perfil
        const perfilImg = document.createElement('img');
        perfilImg.classList.add('autorTrabajo');
        perfilImg.alt = "autor del trabajo";
        perfilImg.title = "autor del trabajo";
        if (foto.imagen_perfil === null) {
            perfilImg.src = "img/defaultprofile.png";
        } else {
            perfilImg.src = `../APP_BACKEND/files/${foto.imagen_perfil}`;
        }

        // Crear la imagen de borrar
        const borrarImg = document.createElement('img');
        borrarImg.classList.add('borrarLista');
        borrarImg.alt = "borrar de la lista";
        borrarImg.title = "borrar de la lista";
        borrarImg.src = "img/borrarlista.png";
        borrarImg.onclick = (event) => {
            event.preventDefault(); // Evita la acción por defecto del enlace
            event.stopPropagation(); // Evita que se dispare el enlace del artículo
            borraDeLista(foto.id_trabajo);
        };

        // Agregar elementos al contenedor
        contenedor.appendChild(portadaImg);
        contenedor.appendChild(perfilImg);
        contenedor.appendChild(borrarImg);

        // Agregar elementos al enlace
        link.appendChild(title);
        link.appendChild(contenedor);

        // Agregar el enlace al artículo
        article.appendChild(link);

        // Agregar el artículo al div de respuesta
        respuestaBusqueda.appendChild(article);
    });
}


function borraDeLista(id_trabajo) {
    console.log(`Borrar trabajo con ID: ${id_trabajo}`);

    let ses = JSON.parse(localStorage.getItem('[SESSION]'));
    let token = localStorage.getItem('[TOKEN]'); 
    let url = `http://localhost:3000/favList/project/${id_trabajo}/user/${ses.id}`;

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    }).then(res => res.json())
    .then(res => {
        console.log(res);
        if (res.status === 200) {
            // Eliminar el artículo del DOM
            const article = document.querySelector(`article[data-id='${id_trabajo}']`);
            if (article) {
                article.remove();
            }
        }
    });
}
