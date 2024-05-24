
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

const uploadFile = ({ data, filename }) => {
    filename = filename.split('.')[0];

    let extension = data.split(';')[0];
    extension = extension.split('/')[1];

    const formatDate = moment().format('DD-MM-YYYY_HH-mm-ss');

    const directoryPath = path.join(__dirname, '../files');
    const filepath = path.join(directoryPath, `${formatDate}_${filename}.${extension}`);

    const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
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

const removeFileFromDirectory = (filename) => {
    const pathFile = path.join(__dirname, '../files', filename);
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