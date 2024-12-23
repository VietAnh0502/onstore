const authorize = (...allowedRoles) => (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
};

module.exports = authorize;

// req.user.role is comming from verifyRefresh with 
// const user = await User.findById(decoded.id);
// and sending to req.user = user;
