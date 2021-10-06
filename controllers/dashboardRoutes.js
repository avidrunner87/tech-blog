const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Post, Comment } = require('../models');

router.get('/', withAuth, async (req, res) => {
    try {

        const user_id = req.session.user_id;

        console.log(user_id);
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['email']
                }
            ],
            where: {
                user_id: user_id
            }
        });

        const posts = postData.map((post) =>
            post.get({ plain: true })
        );

        res.render('dashboard', {
            posts,
            loggedIn: req.session.logged_in
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
