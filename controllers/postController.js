const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


const index = async (req, res, next) => {
    try {
        const where = {};
        const {published, string} = req.query;
        if(published === 'true') {
            where.published = true;
        } else if(published === 'false') {
            where.published = false;
        }

        const posts = await prisma.post.findMany({where})
        res.status(200).json(posts)
    }catch (err) {
        console.log(err)
        next(err)
    }
}


const create = async (req, res, next) => {
    const {title, slug, image, content} = req.body;
    const data = {
        title,
        slug,
        image,
        content,
        published: req.body.published ? true : false
    }
    try {
        const post = await prisma.post.create({data})
        res.status(200).json(post)
    }catch (err) {
        console.log(err)
        next(err)
    }
}

const show = async (req, res, next) => {
    try {
        const {slug} = req.params;
        const post = await prisma.post.findUnique({
            where: {slug: slug}
        })
        if(post) {
            res.json(post)
        } else {
            throw new Error ('Post non trovato')
        }
    }catch (err) {
        console.log(err)
        next(err)
    }
}

const searchPostByContent = async (req, res, next) => {
    try {
        const {content, title} = req.query;
        const post = await prisma.post.findMany({
            where: {
                title: {
                    contains: title
                },
                content: {
                    contains: content
                }
            }
        })
        res.status(200).json(post)
    } catch (err) {
        console.log(err)
        next(err)
    }

}

const update = async (req, res, next) => {
    try {
        const {slug} = req.params;
        const post = await prisma.post.update({
            where: {slug: slug},
            data: req.body
        })
        res.status(200).json(post)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        const {slug} = req.params;
        const post = await prisma.post.delete({
            where: {slug: slug}
        })
        res.status(200).json({
            message: `Post con slug ${slug} cancellato con successo`,
            post: post
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = {
    create,
    index,
    show,
    searchPostByContent,
    update,
    destroy
}