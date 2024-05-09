const getFile = (file) => {
    console.log(file);
};

const uploadFile = (file) => {
    // file = req.files.file
    let path = `/files/${file.name}`;
    console.log(file);
    let returnvalue;
    file.mv(`.${path}`, err => {
        if (err) return res.status(500).send({ message: err });

        return {
            filename: file.name,
            filepath: path,
        };
    });

    return {
        filename: file.name,
        filepath: path,
    };;
};

const convertFileToBase64 = () => {

};

module.exports = {
    getFile,
    uploadFile,
};