const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => 
    res.render('dashboard', {
        loggedIn: req.session.logged_in
    })
);

// router.get('/', async (req, res) => {
//     try {

//         const user_id = req.session.user_id; 

//         const eventsData = await Events.findAll({
//             where: { users_id: user_id },          
//         });
    
//         res.render('dashboard', {
//             eventsData,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//             console.log(err);
//             res.status(500).json(err);
//     }  
// });

module.exports = router;
