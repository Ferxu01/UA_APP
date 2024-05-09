const z = require('zod');

const commentSchema = z.object({
    id_usuario: z.number(),
    //id_trabajo: z.number(),
    texto: z.string()
});

function validateComment(obj) {
    return commentSchema.parseAsync(obj);
}

module.exports = {
    validateComment,
};