// utility function to check if a user is logged in, taken from bootcamp class material
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.status(401).json({ message: 'Unauthorized login!' });
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;