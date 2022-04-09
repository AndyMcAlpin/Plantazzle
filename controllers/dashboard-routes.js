const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, PlantBasic, MyPlant, PlantPicture, PlantGrowing, PlantCare, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

// get all myPlants for dashboard
// router.get('/', withAuth, (req, res) => {
//     MyPlant.findAll({
//         where: {
//             UserId: req.session.user_id
//         },
//         attributes: [
//             'id',
//             'UserId',
//             'PlantBasicId'
//         ],
//         include: [
//             {
//                 model: PlantBasic,
//                 attributes: [
//                     'id',
//                     'botanicalName',
//                     'commonName',
//                     'family',
//                     'origin',
//                     'plantType',
//                     'zone',
//                     'growthRate',
//                     'height',
//                     'flowers',
//                     'toxicity'
//                 ],
//                 include: [
//                     {
//                         model: PlantPicture,
//                         attributes: ['id', 'filename', 'filePath']
//                     },
//                     {
//                         model: PlantGrowing,
//                         attributes: [ 'light', 'temperature', 'humidity', 'soil', 'watering', 'fertilizing' ]
//                     },
//                     {
//                         model: PlantCare,
//                         attributes: [ 'leafCare', 'repotting', 'pruningShaping' ]
//                     }
//                 ]
//             }
//         ]
//     })
//         .then(dbMyPlantData => {
//             const myPlantData = dbMyPlantData.map(myPlants => myPlants.get({ plain: true }));
//             res.render('dashboard', { myPlantData, loggedIn: true });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

router.get('/', (req, res) => {
    req.myPlantGetAll({ nested: true })
        .then(myPlant => {
            console.log(JSON.stringify(myPlant,null,2))
            const myPlantsJson = JSON.parse(JSON.stringify(myPlant))
            const chunk = Math.floor(myPlantsJson.length / 3)
            const chunkFinal = Math.ceil(myPlantsJson.length / 3)
            const plantsMine = {
                plant1: myPlantsJson.splice(0, chunkFinal),
              plant2: myPlantsJson.splice(0, chunk),
              plant3: myPlantsJson.splice(0, chunk)
          }
          return res.render('dashboard', { ...plantsMine, loggedIn: req.session.loggedIn })
      })
      .catch(err => {
          console.error(err)
          res.status(500).json({ message: 'Internal Server Error', code: 500 })
      })
});

// get single myPlant data
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
            const myPlantDatum = dbMyPlantData.get({ plain: true });

            res.render('dashboard-single', {
                myPlantDatum,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// all of a users comments
router.get('/:id', withAuth, (req, res) => {
    Comment.findByPk(req.params.id, {
        attributes: [
            'id',
            'title',
            'commentText',
            // [sequelize.literal('(SELECT COUNT(*) FROM Vote WHERE comment.id = Vote.comment_id)'), 'Vote_count']
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
                ]
            },
            {
                model: User,
                attributes: ['username', 'zipCode']
            },
            // {
            //     model: Vote,
            //     attributes: [[fn('sum', col('upvote')), 'value']],
            //     group: ['value']
            // }
        ]
    })
        .then(dbCommentData => {
            if (dbCommentData) {
                const comment = dbCommentData.get({ plain: true });

                res.render('dashboard-comments', {
                    comment,
                    loggedIn: true
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;