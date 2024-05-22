const z = require('zod');
const i18n = require('../config/i18n');

const loginSchema = z.object({
    email: z.string().email(i18n.__('users.wrongEmailFormat')),
    password: z.string()
});

const registerSchema = z.object({
    nombre: z.string(),
    apellidos: z.string(),
    //fechaNacimiento: z.date(),
    fechaNacimiento: z.string(),
    estudio: z.number(),
    curso: z.number(),
    email: z.string().email(i18n.__('users.wrongEmailFormat')),
    password: z.string(),
    password2: z.string()
})
.superRefine(({ password2, password }, ctx) => {
    if (password2 !== password) {
        ctx.addIssue({
            code: 'custom',
            message: i18n.__('users.passwordsDontMatch'),
        });
    }
});

function validateLogin(obj) {
    return loginSchema.safeParseAsync(obj);
}

function validateRegister(obj) {
    return registerSchema.safeParseAsync(obj);
}

module.exports = {
    validateLogin,
    validateRegister
};