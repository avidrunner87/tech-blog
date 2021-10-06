function withAuth(req, res, next){
    console.log('with auth')
    const { logged_in} = req.session;
    if (!logged_in){
        console.log('not logged in')
        return res.redirect('/');
    }
    console.log('logged in')
    next();
}

module.exports = withAuth;