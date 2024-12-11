const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({
            error: {
                code: 401,
                message: 'Unauthorized',
                details: 'Authorization token is missing or improperly formatted.',
            },
        });
    }

    // Extract the token by removing "Bearer "
    const token = authHeader.replace('Bearer ', '');

    try {
        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken; // Attach the user data to the request
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({
                error: {
                    code: 401,
                    message: 'Unauthorized',
                    details: 'Token has expired.',
                },
            });
        } else {
            return res.status(401).send({
                error: {
                    code: 401,
                    message: 'Unauthorized',
                    details: 'An error occurred while verifying the token.',
                },
            });
        }
    }
};
