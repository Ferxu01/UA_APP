# Manual de usuario
## Instalación
Primero de todo tendremos que tener instalado XAMPP y NodeJS (versión 18.x.x o similares) para poder instalar y ejecutar el servidor, y después haremos lo siguiente:
1. Descomprimir la carpeta UA_APP dentro de la carpeta htdocs de XAMPP. Esta contiene tanto la parte cliente como la del servidor.
2. Entrar a XAMPP e iniciar los servicios de Apache y Mysql.
3. Entrar a `http://localhost/phpmyadmin` e importar la base de datos BBDDUA.sql.
4. Abrir la carpeta del servidor en la consola y ejecutar el comando `npm install` para instalar todas las dependencias de Node.
5. Para iniciar el server ejecutar `npm start`.
6. Abrir en el navegador `localhost/UA_APP/APP_FRONTEND/index.html`, para abrir la página principal de la app.
