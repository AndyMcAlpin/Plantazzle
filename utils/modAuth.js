// A utility function to only aloow moderators to delete plants, not currently used
const modAuth = (req, res, next) => {
    // add moderator's usernames to array to give delete access
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