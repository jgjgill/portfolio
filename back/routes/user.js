const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/mydata', async (req, res, next) => {
  try {
    if (req.user) {
      const userData = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: 'Follower',
            attributes: ['id', 'nickname'],
          },
          {
            model: User,
            as: 'Following',
            attributes: ['id', 'nickname'],
          },
        ],
      });

      return res.status(200).json(userData);
    } else {
      return res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const userData = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Post,
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Follower',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Following',
          attributes: ['id'],
        },
      ],
    });

    if (userData) {
      const data = userData.toJSON();
      data.Posts = data.Posts.length;
      data.Follower = data.Follower.length;
      data.Following = data.Following.length;
      return res.status(200).json(data);
    } else {
      return res.status(404).send('Not User!');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, clientError) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (clientError) {
      return res.status(401).send(clientError.message);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const userData = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: 'Follower',
            attributes: ['id', 'nickname'],
          },
          {
            model: User,
            as: 'Following',
            attributes: ['id', 'nickname'],
          },
        ],
      });

      return res.status(200).json(userData);
    });
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  return res.status(200).send('LOGOUT');
});

router.post('/signup', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다!');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      username: req.body.username,
      nickname: req.body.nickname,
      password: hashedPassword,
    });

    return res.status(201).send('signup success');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/avatarChange', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        avatarNumber: req.body.myAvatar,
      },
      { where: { id: req.user.id } }
    );
    return res.status(200).json({ avatarNumber: req.body.myAvatar });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/nicknameChange', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      { where: { id: req.user.id } }
    );
    return res.status(200).json({ nickname: req.body.nickname });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/descriptionChange', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        description: req.body.description,
      },
      { where: { id: req.user.id } }
    );
    return res.status(200).json({ description: req.body.description });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/postsUpdate', isLoggedIn, async (req, res, next) => {
  try {
    await User.update({
      model: Post,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      return res.status(401).send('no user!');
    }
    await user.addFollower(req.user.id);
    console.log(req.user.nickname);

    return res.status(200).json({
      userId: parseInt(req.params.userId),
      userNickname: req.user.nickname,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:userId/unfollow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      return res.status(401).send('no user!');
    }
    await user.removeFollower(req.user.id);

    return res.status(200).json({ userId: parseInt(req.params.userId) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/follower/list', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      res.status(403).send('no user!');
    }

    const followerList = await user.getFollower({
      limit: parseInt(req.query.limit),
      attributes: {
        exclude: [
          'password',
          'description',
          'createdAt',
          'updatedAt',
          'username',
        ],
      },
    });
    console.log(followerList);
    console.log(followerList.length);
    console.log(req.query.limit);

    return res.status(200).json(followerList);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/following/list', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      res.status(403).send('no user!');
    }

    const followingList = await user.getFollowing({
      limit: parseInt(req.query.limit),
      attributes: {
        exclude: [
          'password',
          'description',
          'createdAt',
          'updatedAt',
          'username',
        ],
      },
    });
    console.log(followingList);

    return res.status(200).json(followingList);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:userId/remove/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {id: req.params.userId}
    })
    if (!user) {
      return res.status(401).send('no user!')
    }
    await user.removeFollowing(req.user.id)

    return res.status(200).json({userId: parseInt(req.params.userId)})
  } catch (err) {
    console.error(err)
    next(err)
  }
})

module.exports = router;
