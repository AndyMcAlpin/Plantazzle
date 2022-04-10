const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: './public/assets/images' });
const { User, PlantBasic, MyPlant, PlantPicture, PlantGrowing, PlantCare, Comment, Vote } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const modAuth = require('../../utils/modAuth');
const { fn, col } = require('sequelize');

router.get('/', (req, res) => {
    req.plantBasicGetAll()
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
                {
                    model: Vote,
                    attributes: [[fn('sum', col('upvote')), 'value']],
                    group: ['value']
                }
                ]
            }
        ]
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

router.post('/', //withAuth,
(req, res) => {
    PlantBasic.create({
        botanicalName: req.body.botanicalName,
        commonName: req.body.commonName,
        family: req.body.family,
        origin: req.body.origin,
        plantType: req.body.plantType,
        zone: req.body.zone,
        growthRate: req.body.growthRate,
        height: req.body.height,
        flowers: req.body.flowers,
        toxicity: req.body.toxicity,
        PlantPictures: {
            filename: req.body.filename
        },
        PlantGrowing: {
            light: req.body.light,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            soil: req.body.soil,
            watering: req.body.watering,
            fertilizing: req.body.fertilizing
        },
        PlantCare: {
            leafCare: req.body.leafCare,
            repotting: req.body.repotting,
            pruningShaping: req.body.pruningShaping
        }
    }, {
        include: [
            { association: PlantBasic.PlantPictures },
            { association: PlantBasic.PlantGrowing },
            { association: PlantBasic.PlantCare }
        ]
    })
        .then(dbPlantBasicData => res.json(dbPlantBasicData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/upload_photo', upload.single('file'), async function (req, res, next) {
  if(!req.session.loggedIn) return res.status(401).json({
    message: 'Not Authorized',
    code: 401
  })

  if(!req.body.botanicalName || !req.body.commonName || !req.file) return res.status(400).json({
    message: 'Bad Request',
    code: 400
  })
  try {
    const plantBasic = await PlantBasic.create(req.body)
    await PlantPicture.create({ PlantBasicId: plantBasic.id, file: req.file })

    return res.json({ message: 'ok', code: 200 })
  } catch(err) {
    console.error(err)
    switch(err.errors[0].type) {
      case 'unique violation':
        error = err.errors[0]
        return res.status(400).json({
          message: 'Bad Request',
          reason: error.message,
          code: 400
        })
      default:
        console.error(err)
        return res.status(500).json({message: 'Internal Server Error', code: 500})
    }
  }
});

router.put('/:id', 
// withAuth, 
(req, res) => {
    PlantBasic.update(
        {
            botanicalName: req.body.botanicalName,
            commonName: req.body.commonName,
            family: req.body.family,
            origin: req.body.origin,
            plantType: req.body.plantType,
            zone: req.body.zone,
            growthRate: req.body.zone,
            height: req.body.height,
            flowers: req.body.flowers,
            toxicity: req.body.toxicity
        },
        // maybe add sub tables
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
    this.PlantBasic.destroy({
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