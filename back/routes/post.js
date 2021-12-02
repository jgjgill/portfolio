const express = require('express');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

const { Post, Image, Comment, User } = require('../models');

router.get('loadPosts', (req, res, next) => {});

router.post('/addPost', isLoggedIn, async (req, res, next) => {
  // req.user.id, req.user.username, req.user.avatarNumber
  // req.body.postText, req.body.rateNumber
  //
  try {
    const post = await Post.create({
      content: req.body.postText,
      rateNumber: req.body.rateNumber,
      UserId: req.user.id,
    });

    const postData = await Post.findOne({
      where: { id: post.id },
      include: [
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
          attributes: ['id', 'nickname', 'avatarNumber'],
        },
        {
          model: User,
          as: 'Liker',
          attributes: ['id'],
        },
      ],
    });
    return res.status(201).json(postData);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/removePost', isLoggedIn, (req, res, next) => {});

router.post('/:postId/addComment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) return res.status(403).send('NO POST!');

    const comment = await Comment.create({
      content: req.body.commentText,
      PostId: parseInt(req.params.postId),
      UserId: req.user.id,
    });

    const commentData = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname', 'avatarNumber'],
        },
      ],
    });

    return res.status(201).json(commentData);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/removeComment', isLoggedIn, async (req, res, next) => {
  try {
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/likePost', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.body.postId } });
    if (!post) {
      return res.status(403).send('no content!!!');
    }
    await post.addLiker(req.user.id);
    console.log(post);
    console.log(post.id);
    console.log(req.user.id);
    res.status(201).json({ postId: post.id, UserId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/unlikePost', isLoggedIn, async (req, res, next) => {
  try {
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
