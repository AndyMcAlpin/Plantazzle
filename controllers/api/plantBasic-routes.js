const router = require('express').Router();
const { User, PlantBasic, MyPlant, PlantPicture } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

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
            // 'width'
            'flowers',
            'toxicity'
        ],
        include: [
            {
                model: PlantPicture,
                attributes: [
                    'id',
                    'filename',
                    'filePath',
                    'PlantBasicId'
                ]
            },
            {
                // [other plant info tables]
            },
            {
                // plant comments togo here
            }
        ]
    })
        .then(dbPlantBasicData => res.json(dbPlantBasicData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

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
            // 'width'
            'flowers',
            'toxicity'
        ],
        // include: plant info tables and plant comments
    })
        .then(dbPlantBasicData => {
            if (!dbPlantBasicData) {
                res.status(404).json({ message: 'No plant with this id, please try a different search or create a new plant!' });
                return;
            }
            res.json(dbPlantBasicData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    PlantBasic.create({
        botanicalName: req.body.botanicalName, 
        commonName: req.body.commonName,
        family: req.body.family,
        origin: req.body.origin,
        plantType: req.body.plantType,
        zone: req.body.zone,
        growthRate: req.body.growthRate,
        height: req.body.height,
        // width: req.body.width,
        flowers: req.body.flowers,
        toxicity: req.body.toxicity
    })
        .then(dbPlantBasicData => res.json(dbPlantBasicData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// router.put('/upvote', withAuth, (req, res) => {

// router.put('/downvote', withAuth, (req, res) => {

router.put('/:id', withAuth, (req, res) => {
    PlantBasic.update(
        {
            // tbd
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPlantBasicData => {
            if (!dbPlantBasicData) {
                res.status(404).json({ message: 'No plant found with this Id' });
                return;
            }
            res.json(dbPlantBasicData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', 
// modAuth, 
(req, res) => {
    this.post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPlantBasicData => {
            if (!dbPlantBasicData) {
                res.status(404).json({ message: 'No plant found with this Id' });
                return;
            }
            // check if this works right
            console.log('deleted id#', req.params.id); 
            res.json(dbPlantBasicData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;