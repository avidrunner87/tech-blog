const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['email']
                }
            ]
        });

        const posts = postData.map((post) =>
            post.get({ plain: true })
        );

        console.log(posts);

        res.render('homepage', {
            posts,
            loggedIn: req.session.logged_in
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;