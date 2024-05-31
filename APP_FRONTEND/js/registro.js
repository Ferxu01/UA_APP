function registro(e){
    e.preventDefault();

    // Este metodo genera la url completa de la peticion, para mayor comodidad
    url = getRequestUrl('/auth/register');

    const form = e.currentTarget,
        fd = new FormData(form);

    let obj = {
        nombre: fd.get("nombre"),
        apellidos: fd.get("apellidos"),
        fechaNacimiento: fd.get("fecha_nac"),
        curso: parseInt(fd.get("selectCurso")),
        estudio: parseInt(fd.get("selectEstudios")),
        email: fd.get("email"),
        password: fd.get("pwd"),
        password2: fd.get("pwd2")
    };
        
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    })
    .then(res => res.json())
    .then(res => {
        if(res.status == 200){
            localStorage.setItem('[SESSION]', JSON.stringify(res.response));
            localStorage.setItem('[TOKEN]', res.token);
    
            location.href = "index.html";
        }else {
            if (res.response && Array.isArray(res.response)) {
                ponMsgErr(res.response[0].message);
            } else {
                ponMsgErr(res.response);
            }
        }
    })
    .catch(err => {
        console.log("Algo ha fallado en el servidor:");
        console.log(err);
    });
}

function ponMsgErr(msg){
    const divErr = document.getElementsByClassName("cuadritoError");

    if (divErr.length > 0 && divErr[0].firstElementChild) {
        divErr[0].removeChild(divErr[0].firstElementChild);
    }

    const msgErr = document.createElement("p");
    msgErr.setAttribute("class", "msgErr");

    msgErr.textContent = msg;

    divErr[0].appendChild(msgErr);
}

function cargaGradoMaster(){
    let urlG = getRequestUrl(`/studies/degree`);
    let urlM = getRequestUrl(`/studies/master`);

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
            const selectEstudios = document.getElementById("selectEstudios");

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

document.addEventListener('DOMContentLoaded', (event) => {
    translateRegisterPage();
});