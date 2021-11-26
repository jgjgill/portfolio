const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log('db connected');
  })
  .catch(console.error);

app.use(
  cors({
    origin: true,
    credentials: false,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
passportConfig();

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use('/post', postRouter);
app.use('/user', userRouter);


app.listen(3065, () => {
  console.log('server start');
});
