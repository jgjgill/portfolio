const express = require('express');
const dayjs = require('dayjs');
const axios = require('axios')
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

const yesterday = dayjs().subtract(1, 'day').format('YYYYMMDD');
const movieURL = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.MOVIE_KEY}&targetDt=${yesterday}`;

router.get('/movieRank', async (req, res, next) => {
  try {
    const {
      data: {
        boxOfficeResult: { dailyBoxOfficeList: movies },
      },
    } = await axios.get(movieURL);
    res.status(201).json(movies);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
