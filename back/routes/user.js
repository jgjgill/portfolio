const express =require('express');
const bcrypt = require('bcrypt')

const {User} = require('../models')

const router = express.Router();


router.post('/signup', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        username: req.body.username,
      }
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
    res.status(201).send('signup success');
  } catch (err) {
    console.error(err);
    next(err);
  }
});


module.exports = router;