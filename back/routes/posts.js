const express = require('express');
const { Op } = require('sequelize');

const { Post, User, Comment, Image } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId) };
    }

    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname', 'avatarNumber'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname', 'avatarNumber'],
            },
          ],
        },
        {
          model: User,
          as: 'Liker',
          attributes: ['id'],
        },
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname', 'avatarNumber']
            },
            {
              model: Image,
            }
          ]
        }
      ],
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
