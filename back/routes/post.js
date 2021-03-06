const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const { isLoggedIn } = require('./middlewares');
const { Post, Image, Comment, User, Hashtag } = require('../models');

try {
  fs.accessSync('uploads');
} catch (err) {
  console.log('create uploads folder');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.get('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send('No Post!');
    }

    const retweetWithPrevPost = await Post.findOne({
      where: { id: post.id },
      include: [
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
    res.status(200).json(retweetWithPrevPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/addPost', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.postText.match(/#[^\s#]+/g);
    console.log('???????????? : ', hashtags)
    const post = await Post.create({
      title: req.body.postTitle,
      content: req.body.postText,
      rateNumber: req.body.rateNumber,
      UserId: req.user.id,
    });

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      );
      
      await post.addHashtags(result.map((v) => v[0]))
    }

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }

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

router.delete('/:postId/removePost', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ postId: parseInt(req.params.postId) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

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

router.delete(
  '/:postId/:commentId/removeComment',
  isLoggedIn,
  async (req, res, next) => {
    try {
      await Comment.destroy({
        where: {
          id: req.params.commentId,
          PostId: req.params.postId,
          UserId: req.user.id,
        },
      });

      return res.status(200).json({
        postId: parseInt(req.params.postId),
        commentId: parseInt(req.params.commentId),
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

router.patch('/likePost', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.body.postId },
    });
    if (!post) {
      return res.status(403).send('no content!!!');
    }
    await post.addLiker(req.user.id);

    return res.status(201).json({ postId: post.id, UserId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:postId/unlikePost', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('no content!');
    }
    await post.removeLiker(req.user.id);

    return res.status(201).json({ postId: post.id, userId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post(
  '/uploadImages',
  isLoggedIn,
  upload.array('image'),
  async (req, res, next) => {
    try {
      return res.status(200).json(req.files.map((v) => v.filename));
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

router.post('/:postId/retweetPost', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: Post,
          as: 'Retweet',
        },
      ],
    });
    if (!post) {
      return res.status(403).send('no content!');
    }
    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send('my post cannot retweet!');
    }

    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send('You already did retweet!');
    }

    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      title: 'retweetTitle',
      content: 'retweetContent',
      rateNumber: -1,
    });
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
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

    return res.status(200).json(retweetWithPrevPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
