const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, PlantBasic, MyPlant, PlantPicture, PlantGrowing, PlantCare, Comment, Vote } = require('../models');

// get all of PlantBasic info for homepage
router.get('/', (req, res) => {
    PlantBasic.findAll({
        attributes: [
            'id',
            'botanicalName',
            'commonName',
            'family',
            'origin',
            'plantType',
            'zone',
            'growthRate',
            'height',
            'flowers',
            'toxicity'
        ],
        include: [
            {
                model: PlantPicture,
                attributes: ['id', 'filename', 'filePath']
            },
            {
                model: PlantGrowing,
                attributes: [ 'light', 'temperature', 'humidity', 'soil', 'watering', 'fertilizing' ]
            },
            {
                model: PlantCare,
                attributes: [ 'leafCare', 'repotting', 'pruningShaping' ]
            },
            {
                model: Comment,
                attributes: [ 'id', 'title', 'commentText' ],
                include: [{
                    model: User,
                    attributes: ['userName', 'zipCode']
                },
                // {
                //     model: Vote,
                //     attributes: [[fn('sum', col('upvote')), 'value']],
                //     group: ['value']
                // }
                ]
            }
        ]
    })
        .then(dbPlantBasicData => {
            const plantData = dbPlantBasicData.map(plantBasic => plantBasic.get({ plain: true }));

            res.render('homepage', {
                plantData
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// login page
router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //     // change to dashboard?
    //     res.redirect('/');
    //     return;
    // }
    res.render('sign_up');
});

// single plant page
router.get('/:id', (req, res) => {
    PlantBasic.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'botanicalName',
            'commonName',
            'family',
            'origin',
            'plantType',
            'zone',
            'growthRate',
            'height',
            'flowers',
            'toxicity'
        ],
        include: [
            {
                model: PlantPicture,
                attributes: ['id', 'filename', 'filePath']
            },
            {
                model: PlantGrowing,
                attributes: [ 'light', 'temperature', 'humidity', 'soil', 'watering', 'fertilizing' ]
            },
            {
                model: PlantCare,
                attributes: [ 'leafCare', 'repotting', 'pruningShaping' ]
            },
            {
                model: Comment,
                attributes: [ 'id', 'title', 'commentText' ],
                include: [{
                    model: User,
                    attributes: ['userName', 'zipCode']
                },
                // {
                //     model: Vote,
                //     attributes: [[fn('sum', col('upvote')), 'value']],
                //     group: ['value']
                // }
                ]
            }
        ]
    })
        .then(dbPlantBasicData => {
            if (!dbPlantBasicData) {
                res.status(404).json({ message: 'No plant with this id, please try a different search or create a new plant!' });
                return;
            }
            const plantDatum = dbPlantBasicData.get({ plain: true });

            res.render('single-plant', {
                plantDatum
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;