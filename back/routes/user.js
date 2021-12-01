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
            as: 'Followers',
          },
          {
            model: User,
            as: 'Followings',
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
            as: 'Followers',
          },
          {
            model: User,
            as: 'Followings',
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
    })
    

  } catch (err) {
    console.error(err)
    next(err)
  }
})




router.post('/follow', isLoggedIn, async (req, res, next) => {
 try {
  
 } catch (err) {
   console.error(err)
   next(err)
 }
})

router.post('/unfollow', isLoggedIn, (req, res, next) => {
  try {

  } catch (err) {
    console.error(err)
    next(err)
  }
})

module.exports = router;
