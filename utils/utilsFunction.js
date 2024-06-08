
const generateSlug = (title) => {
    return title.toLowerCase().split(' ').join('-');
}

module.exports = {
    generateSlug
}