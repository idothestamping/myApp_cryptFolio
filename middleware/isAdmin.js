module.exports = function(req, res, next){
    if(req.user && req.user.admin){
        next();
    }
    else {
        req.flash('error', 'Admins only.');
        res.redirect('/profile');
    }
};