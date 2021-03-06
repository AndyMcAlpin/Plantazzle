const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const {PlantBasic, MyPlant, PlantPicture, PlantGrowing, PlantCare, Comment, User} = require("../models");

/**
 * This middleware setup allows us to keep the PlantBasic.findAll for the get('/api/plants') route and the
 * homepage to have the exact same method being used so the exact same data is being used.  If one changes they all
 * change.
 */
router.use((req, res, next) => {

  console.log(req.session)
  req.myPlantGetAll = options => MyPlant.findAll({
    ...!options ? {} : options,
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

  /**
   *
   * @param {Array<string>}attributes
   * @param {QueryOptions} options
   * @returns {Promise<PlantBasic[]>}
   */
  req.plantBasicGetAllAttributes = (attributes, options) => PlantBasic.findAll({
    attributes,
    ...!options ? {} : options
  })

  /**
   * PlantBasic.findAll located here
   * @param {QueryOptions} options This is the options for Sequelize Queries
   * @returns {Promise<Array<PlantBasic>>}
   */
  req.plantBasicGetAll = options => PlantBasic.findAll({
      ...!options ? {} : options,
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


  return next()
})

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;