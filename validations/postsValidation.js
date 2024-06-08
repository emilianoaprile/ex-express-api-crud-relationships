const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const bodyData = {
    title: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Il titolo è obbligatorio',
            bail: true
        },
        isString: {
            errorMessage: 'Il titolo deve essere una stringa',
            bail: true
        },
        isLength: {
            errorMessage: 'Il titolo deve avere almeno 3 caratteri',
            options: {min: 3},
            bail: true
        }
    },
    image: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'L\'immagine è obbligatoria',
            bail: true
        },
        isString: {
            errorMessage: 'L\'immagine deve essere una stringa',
            bail: true
        }
    },
    content: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Il contenuto è obbligatorio',
            bail: true
        },
        isString: {
            errorMessage: 'Il contenuto deve essere una stringa',
            bail: true
        },
        isLength: {
            errorMessage: 'Il contenuto deve avere almeno 3 caratteri',
            options: {min: 3},
            bail: true
        }
    },
    published: {
        in: ['body'],
        isBoolean: {
            errorMessage: 'Il campo published deve essere un booleano',
            bail: true
        }
    }

}

module.exports = {
    bodyData
}