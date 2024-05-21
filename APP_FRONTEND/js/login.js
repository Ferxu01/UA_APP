
function login(e){
    event.preventDefault(e);

    url = "http://localhost:3000/auth/login"

    const form = e.currentTarget,
        fd = new FormData(form);

    let obj = {
        email: "fernando@gmail.com",
        password: "pass1"
    }

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
    .then(res => console.log(res));

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