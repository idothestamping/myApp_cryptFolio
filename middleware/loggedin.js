module.exports = function(req, res, next){
    if(req.user){
        next();
    }
    else {
        req.flash('error', 'please login to access this page.');
        res.redirect('/auth/login');
    }
};