const router = require('express').Router();
const { User, PlantBasic, MyPlant } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    MyPlant.findAll({
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
                    // 'width'
                    'flowers',
                    'toxicity'
                ],
                // include: additional plant tables
            }
        ]
    })
        .then(dbMyPlantData => res.json(dbMyPlantData))
        .catch(err => {
            console.log(err);
            res.statuus(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    MyPlant.findOne({
        where: {
            id: req.params.id
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
                    // 'width'
                    'flowers',
                    'toxicity'
                ],
                // include: additional plant tables
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

router.post('/', withAuth, (req, res) => {
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

router.delete('/:id', withAuth, (req, res) => {
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