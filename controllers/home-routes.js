const router = require('express').Router();
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

router.get('/sign-up', (req, res) => {
    res.render('sign_up');
});

router.get('/login', (req, res) => {
    /*if (req.session.loggedIn) {
        change to dashboard?
        res.redirect('/');
        return;
    }*/
    res.render('login')
})

router.get('/testing-homepage', (req, res) => {
    req.plantBasicGetAll({ nested: true })
      .then(plantBasics => {
          const plantsJson = JSON.parse(JSON.stringify(plantBasics))
          const chunk = Math.ceil(plantsJson.length / 3)
          const plants = {
              plant1: plantsJson.splice(0, chunk),
              plant2: plantsJson.splice(0, chunk),
              plant3: plantsJson.splice(0, chunk)
          }
          return res.render('homepage', { ...plants })
      })
      .catch(err => {
          console.error(err)
          res.status(500).json({ message: 'Internal Server Error', code: 500 })
      })
})

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