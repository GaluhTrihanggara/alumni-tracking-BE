const checkAdminRole = (req, res, next) => {
    try {
        const { role } = req.user;

        if (role !== "admin") {
            return res.status(401).json({
                message: "Unauthorized Action | User",
            });
        }

        console.log("Continue Action | Admin");
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = checkAdminRole