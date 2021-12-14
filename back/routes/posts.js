const express = require('express');
const { Op } = require('sequelize');

const { Post, User, Comment, Image, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

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
              attributes: ['id', 'nickname', 'avatarNumber'],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/user/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const where = { UserId: req.params.userId };
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
              attributes: ['id', 'nickname', 'avatarNumber'],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/hashtag/:hashtagName', async (req, res, next) => {
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
          model: Hashtag,
          where: { name: decodeURIComponent(req.params.hashtagName) },
        },
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
              attributes: ['id', 'nickname', 'avatarNumber'],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/rate/:rateValue', async (req, res, next) => {
  try {
    const where = {rateNumber: req.params.rateValue};
    if (parseInt(req.query.lastId)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId) };
    }
    
    const posts = await Post.findAll({
      where,
      limit: 10,
      oreder: [
        ['createAt', 'DESC'],
        [Comment, 'createAt', 'DESC']
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname', 'avatarNumber']
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname', 'avatarNumber']
            }
          ]
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
              model: Image
            }
          ]
        }
      ]
    })

    res.status(200).json(posts)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

module.exports = router;
