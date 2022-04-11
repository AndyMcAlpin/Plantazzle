const router = require('express').Router();
const { User, PlantBasic, MyPlant, PlantPicture, PlantGrowing, PlantCare, } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all of a user's personal plants
router.get('/', withAuth, (req, res) => {
    MyPlant.findAll({
        where: {
            UserId: req.session.user_id
        },
        attributes: [
            'id',
            'UserId',
            'PlantBasicId'
        ],
        include: [
            {
                model: PlantBasic,
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
                    }
                ]
            }
        ]
    })
        .then(dbMyPlantData => res.json(dbMyPlantData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Not currently used, get a user's individual plant
router.get('/:id', withAuth, (req, res) => {
    MyPlant.findOne({
        where: {
            id: req.params.id,
            UserId: req.session.user_id
        },
        attributes: [
            'id',
            'UserId',
            'PlantBasicId'
        ],
        include: [
            {
                model: PlantBasic,
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
                    }
                ]
            }
        ]
    })
        .then(dbMyPlantData => {
            if (!dbMyPlantData) {
                res.status(404).json({ message: 'No plant with this id, your plants are growing elsewhere' });
                return;
            }
            res.json(dbMyPlantData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Add a new plant to a user's personal plant list
router.post('/', 
// withAuth, 
(req, res) => {
    MyPlant.create({
        userId: req.session.user_id,
        // check this probably wrong, needs a FUNCTION
        PlantBasicId: req.body.PlantBasic.id
    })
        .then(dbMyPlantData => res.json(dbMyPlantData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
});

// delete a plant from personal plant list, not currently used
router.delete('/:id', 
// withAuth, 
(req, res) => {
    MyPlant.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbMyPlantData => {
            if (!dbMyPlantData) {
                res.status(404).json({ message: 'Your plant was not found at this id' });
                return;
            }
            res.json(dbMyPlantData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;