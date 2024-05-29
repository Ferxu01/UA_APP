
const path = require('path');
const fs = require('fs').promises;
const moment = require('moment');

const getFile = async (filename) => {
    const filepath = path.join(__dirname, '../files', filename);

    try {
        const fileData = await fs.readFile(filepath);
        const base64Data = convertFileToBase64(fileData);
        const mimeType = getMimeType(filename);

        return `data:${mimeType};base64,${base64Data}`;
    } catch (err) {
        console.error('Error al leer el archivo:', err);
        return null;
    }
};

const uploadFile = ({ data, filename, portada }) => {
    const fichero = filename.split('.');
    const nomFichero = fichero[0];
    const extension = fichero[1];

    const formatDate = moment().format('DD-MM-YYYY_HH-mm-ss');
    let directoryPath = null, filepath = null;

    if (portada) {
        directoryPath = path.join(__dirname, '../files/portadas');
        filepath = path.join(directoryPath, `${nomFichero}.${extension}`);
    } else {
        directoryPath = path.join(__dirname, '../files');
        filepath = path.join(directoryPath, `${formatDate}_${nomFichero}.${extension}`);
    }

    let base64Data = '';
    if (extension === 'pdf') {
        base64Data = data.replace(/^data:application\/pdf;base64,/, '');
    } else if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
        base64Data = data.replace(/^data:image\/\w+;base64,/, '');
    }
    
    const binaryData = convertBase64ToFile(base64Data);

    fs.writeFile(filepath, binaryData, err => {
        if (err) {
            console.error('Error al guardar el archivo:', err);
            return null;
        }
        console.log('Archivo guardado exitosamente:', filepath);
        return;
    });

    return {
        filename: path.basename(filepath),
        filepath: filepath,
    };;
};

const removeFileFromDirectory = (filename, portada) => {
    let pathFile = null;
    if (portada) {
        pathFile = path.join(__dirname, '../files/portadas', filename);
    } else {
        pathFile = path.join(__dirname, '../files', filename);
    }
    fs.unlink(pathFile);
};

const convertFileToBase64 = (imageData) => {
    return imageData.toString('base64');
};

const convertBase64ToFile = (imageData) => {
    return Buffer.from(imageData, 'base64');
};

const getMimeType = (fileName) => {
    const ext = path.extname(fileName).toLowerCase();
    switch (ext) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        case '.pdf':
            return 'application/pdf';
        default:
            return 'application/octet-stream';
    }
};

module.exports = {
    getFile,
    uploadFile,
    removeFileFromDirectory,
};