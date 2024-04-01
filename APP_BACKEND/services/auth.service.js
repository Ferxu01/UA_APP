const postLogin = async ({ email, password }) => {
    console.log(`
        Email: ${email} | Password: ${password}
    `);
};

const postRegister = async () => {

};

module.exports = {
    postLogin,
    postRegister
};