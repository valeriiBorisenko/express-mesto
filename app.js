const express = require('express');
const mongoose = require('mongoose');

const { cardsRoutes } = require('./routes/cards');
const { usersRoutes } = require('./routes/users');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '6084bfb7befcee46d4dc2d9e',
  };

  next();
});

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes)

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
