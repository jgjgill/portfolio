const express = require('express');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const db = require('./models');

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log('db connected');
  })
  .catch(console.error);

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('server start');
});
