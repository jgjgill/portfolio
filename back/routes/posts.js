const express = require('express')

const {Post, User, Comment, Image} = require('../models')

const router = express.Router()

router.get('/loadPosts', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [['createdAt', 'DESC'], [Comment, 'createdAt', 'DESC']],
      include: [{
        model: User,
        attributes: ['id', 'nickname', 'avatarNumber']
      }, {
        model: Image
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname', 'avatarNumber']
        }]
      }, {
        model: User,
        as: 'Liker',
        attributes: ['id']
      }]
    })
    
    res.status(200).json(posts)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

module.exports = router