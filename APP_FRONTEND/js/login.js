
function login(e){
    e.preventDefault();

    url = "http://localhost:3000/auth/login"

    const form = e.currentTarget,
        fd = new FormData(form);

    let obj = {
        email: fd.get("email"),
        password: fd.get("password")
    };

    let emailValido = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if(!emailValido.test(obj.email)){
        ponMsgErr("Por favor, introduce un email válido.")
    }else{
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
                localStorage.setItem('[TOKEN]', JSON.stringify(res.token));
        
                location.href = "index.html";
            }else if(res.status == 401){
                ponMsgErr("Email o contraseña equivocados.");
            }else{
                ponMsgErr("Algo ha fallado, por favor, vuelve a intentarlo.");
            }
    
        });
    }

    
    

    // const token = 'usuario1:cdbsjdbbkvsdbkv';
    // fetch('http://localhost:3000/api/usuarios/ferxu01', {
    //     method: 'POST',
    //     // Datos en enviar a la API. (Solo POST y PUT)
    //     body: {
    //         "usuario": "pepito",
    //         "password": "1234"
    //     },
    //     // Content-Type: application/json -> Formato de envío de body
    //     // Authorization: {token} -> Se envía el token para autenticarse
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": token,
    //     }
    // })
    // .then(res => res.json())
    // .then(res => console.log(res));




    
// document.getElementById("formLogin").addEventListener("onsubmit", function(){
//     console.log("Se ha enviado correctamente")
// });
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

document.addEventListener('DOMContentLoaded', (event) => {
    translateLoginPage();
});