const express = require('express');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

const {Post, Image, Comment, User} = require('../models')

router.get('loadPosts', (req, res, next) => {})


router.post('/addPost', isLoggedIn, async (req, res, next) => {
  // req.user.id, req.user.username, req.user.avatarNumber
  // req.body.postText, req.body.rateNumber
  //
  try {
    const post = await Post.create({
      content: req.body.postText,
      rateNumber: req.body.rateNumber,
      UserId: req.user.id
    })

    const postData = await Post.findOne({
      where: {id: post.id},
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname', 'avatarNumber']
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname', 'avatarNumber']
      }, {
        model: User,
        as: 'Liker',
        attributes: ['id']
      }]
    })
    console.log(postData)
    return res.status(201).json(postData)
  } catch (err) {
    console.error(err)
    next(err)
  }
});

router.delete('/removePost', isLoggedIn, (req, res, next) => {

})

module.exports = router;