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
            // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE comment.id = vote.comment_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username', 'zipCode']
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