const router = require('express').Router();
const { User } = require('../../models');
const { v4: uuidv4 } = require('uuid');

// CREATE new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            id: uuidv4(),
            email: req.body.email,
            password: req.body.password
        });

        req.session.user_id = userData.id;
        req.session.logged_in = true;

        req.session.save(() => {
            res.status(200).json({ message: 'Sign up user' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            res.status(400).json({
                message: 'Incorrect email or password. Please try again!'
            });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: 'Incorrect email or password. Please try again!'
            });
            return;
        }

        // Once the user successfully logs in, set up the sessions variable 'logged_in'
        req.session.save(() => {
            req.session.logged_in = true;

            res.status(200).json({
                user: userData,
                message: 'You are now logged in!'
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    // When the user logs out, destroy the session
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
