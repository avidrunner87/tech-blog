const router = require('express').Router();
const path = require('path');
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
        });

        console.log(req.session.logged_in);

        const posts = postData.map((post) =>
            post.get({ plain: true })
        );

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