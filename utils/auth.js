function withAuth(req, res, next){
    const { logged_in } = req.session;
    if (!logged_in){
        return res.redirect('/login');
    }
    next();
}

module.exports = withAuth;