const router = require('express').Router();
const { User, PlantBasic, MyPlant, PlantPicture, PlantGrowing, PlantCare, Comment, Vote } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
// const modAuth = require('../../utils/modAuth');
const { fn, col } = require('sequelize');

router.get('/:id', (req, res) => {
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
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (res, req) => {
    Comment.update(
        {
            commentText: req.body.commentText
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbCommentData => {
            if(!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// router.put('/upvote', withAuth, (req, res) => {

module.exports = router;