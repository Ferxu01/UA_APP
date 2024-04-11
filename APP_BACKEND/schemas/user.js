const z = require('zod');

const loginSchema = z.object({
    email: z.string().email('Este formato de email no es válido'),
    password: z.string()
});

const registerSchema = z.object({
    nombre: z.string(),
    apellidos: z.string(),
    //fechaNacimiento: z.date(),
    fechaNacimiento: z.string(),
    estudio: z.number(),
    curso: z.number(),
    email: z.string().email('Este formato de email no es válido'),
    password: z.string(),
    password2: z.string()
})
.superRefine(({ password2, password }, ctx) => {
    if (password2 !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Las contraseñas no coinciden',
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