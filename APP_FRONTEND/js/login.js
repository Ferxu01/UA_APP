
function login(e){
    event.preventDefault(e);

    url = "http://localhost:3000/auth/login"

    const form = e.currentTarget,
        fd = new FormData(form);

    let obj = {
        email: fd.get("email"),
        password: fd.get("password")
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
    .then(res => {
        if(res.status == 200){
            localStorage.setItem('[SESSION]', JSON.stringify(res.response));
            localStorage.setItem('[TOKEN]', JSON.stringify(res.token));
    
            location.href = "index.html";
        }else if(res.status == 401){
            console.log("tamos mal");
        }

    })
    
    

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