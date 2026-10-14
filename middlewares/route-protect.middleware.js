function protectRoutes (req, res, next) {
    if(!res.locals.isAuth) {
        return res.status(401).render("shared/401");
    }
    if(req.path.startsWith("/admin") && !res.locals.isAdmin) {
        return res.status(401).render("shared/403");
    }
    next();
}

module.exports = protectRoutes;