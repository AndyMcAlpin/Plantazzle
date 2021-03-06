const router = require('express').Router();
const { User, PlantBasic, MyPlant, PlantPicture, PlantGrowing, PlantCare, Comment, Vote } = require('../../models');
const { fn, col } = require('sequelize');

// get all users, not currently used
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// logs a user out
router.post('/logout', (req, res) => {
    if (!req.session.loggedIn) {
        res.status(404).end();
    } 
        return req.session.destroy(() => {
            res.status(204).end();
        }); 
});

// Find a single user, not currently used
router.get('/:id', (req, res) => {
    return User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: MyPlant,
                attributes: ['id', 'UserId', 'PlantBasicId'],
                include: {
                    model: PlantBasic,
                    attributes: ['botanicalName', 'commonName']
                }
            },
            {
                model: Comment,
                attributes: [ 'id', 'title', 'commentText' ],
                include: {
                    model: Vote,
                    attributes: [[fn('sum', col('upvote')), 'value']],
                    group: ['value']
                }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User exists with this Id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        zipCode: req.body.zipCode
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// log a user in
router.post('/login', (req, res) => {
    User.authenticate(req.body.username, req.body.password)
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No User with that email' });
                return;
            }
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: 'You are now logged in' });
            });
        });
});





module.exports = router;