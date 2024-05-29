function registro(e){
    e.preventDefault();

    // Este metodo ya te genera la url completa de la peticion, para mayor comodidad
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

    if(obj.password != obj.password2){
        ponMsgErr("Las contraseñas no coinciden.");
    }else{
        console.log(obj);

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
            }else{
                //FIXME: MOSTRAR EL MENSAJE QUE VIENE DEL API en la variable "res.response"
                ponMsgErr("Algo ha fallado, por favor, vuelve a intentarlo.");
            }
    
        })
        .catch(err => {
            console.log("Algo ha fallado en el servidor:");
            console.log(err);
        });
    }
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
    const lang = sessionStorage.getItem('lang') || 'es';

    let urlG = `http://localhost:3000/${lang}/studies/degree`;
    let urlM = `http://localhost:3000/${lang}/studies/master`;

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

            const selectEstudios = document.getElementById("selectEstudios");
            console.log(res.response);

            res.response.forEach(element => {
                const opt = document.createElement("option");

                opt.setAttribute("value", `${element.id}`);
                opt.textContent = `${element.nombre}`;

                selectEstudios.appendChild(opt);
            });

            console.log(res2.response);

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