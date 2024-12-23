const verifyAccessToken = require('../Middleware/verifyAuthAccess');
const verifyRefreshToken = require('../Middleware/verifyRefresh');

// Middleware to verify access token and refresh if needed
const validateAccessToken = async (req, res, next) => {
    try {
        // First, verifyRefreshToken middleware will check if the token is valid
        // then also send req.user for the current user. (by query in the db)
        await verifyRefreshToken(req, res, next);
    } catch (error) {
        res.status(403);
    }
};

module.exports = validateAccessToken;
