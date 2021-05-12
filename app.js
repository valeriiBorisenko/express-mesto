require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { routes } = require('./routes');
const err = require('./middlewares/err');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();
app.use(cookieParser());

app.use(helmet());

app.use('/', routes);

app.use(errors());

app.use(err);

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log('Connected to mestodb');

  await app.listen(PORT, () => {
    console.log(`Server listen on ${PORT}`);
  });
}

main();
