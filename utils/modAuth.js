const modAuth = (req, res, next) => {
    modArr = ['modUsernameHere']

    result = modArr.filter(checkMod);

    function checkMod(mod) {
        return mod == req.session.user_id;
    }
    if (result == false) {
        res.status(404).json({ message: 'You are not a moderator' });
    } else {
        next();
    }
};

module.exports = modAuth;