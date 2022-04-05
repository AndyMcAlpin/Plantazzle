const router = require('express').Router();
const { User, PlantBasic, MyPlant, PlantPicture, PlantGrowing, PlantCare, Comment, Vote } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
// const modAuth = require('../../utils/modAuth');
const { fn, col } = require('sequelize');

router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'title',
            'commentText',
            // [sequelize.literal('(SELECT COUNT(*) FROM Vote WHERE comment.id = Vote.comment_id)'), 'Vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username', 'zipCode']
            },
            {
                model: Vote,
                attributes: [[fn('sum', col('upvote')), 'value']],
                group: ['value']
            }
        ]
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;