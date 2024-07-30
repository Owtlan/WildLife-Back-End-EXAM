const Post = require('../models/Post');

async function createPost(post) {
    const result = new Post(post);

    await result.save()

    return result;
}


async function getPosts() {
    return Post.find({})
}

async function getPostById(id) {
     // here i need to put lastName in empty field and to working but for now cant
    return Post.findById(id).populate('author', 'firstName', '');
}

module.exports = {
    createPost,
    getPosts,
    getPostById
}