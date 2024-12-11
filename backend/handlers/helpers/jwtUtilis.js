const jwt = require('jsonwebtoken');

exports.getUserInfo = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null; // No valid auth header
    }

    // Extract the token
    const token = authHeader.replace('Bearer ', '');

    try {
        // Verify and decode the token
        const data = jwt.verify(token, process.env.JWT_SECRET);

        return data; // Return the decoded data (user info)

    } catch (error) {
        // Handle specific error cases
        if (error.name === 'TokenExpiredError') {
            res.status(401).send({
                error: {
                    code: 401,
                    message: 'Unauthorized',
                    details: 'Token has expired.',
                },
            });
        } else {
            res.status(401).send({
                error: {
                    code: 401,
                    message: 'Unauthorized',
                    details: 'Invalid token.',
                },
            });
        }
        return null; // Ensure to return null if there's an error
    }
};
