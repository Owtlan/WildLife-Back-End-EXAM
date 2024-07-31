const router = require('express').Router()
const { isUser } = require('../middleware/guards')
const { createPost } = require('../services/post')
const { mapErrors } = require('../util/mappers')
const { postViewModel } = require('../util/mappers')
const { getPosts, getPostById } = require('../services/post');
const { updatePost} = require('../services/post')
router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Post' })
})

router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const post = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
        author: userId
    }


    try {
        await createPost(post);

        res.redirect('/catalog')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Post', errors, data: post });
    }
})


router.get('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const post = postViewModel(await getPostById(id))


    if (req.session.user._id != post.author._id) {
        return res.redirect('/login')
    }

    res.render('edit', { title: 'Edit Post', post });
})

router.post('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const post = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
    }

    try {
        await updatePost(id, post)
        res.redirect('/catalog/' + id)
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err)
        res.render('edit', { title: 'Edit Post', post, errors });
    }
})


module.exports = router