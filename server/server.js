const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB Error => ', err));

// Apply middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// Load all routes from the routes directory
readdirSync('./routes').map((file) => {
  const route = require(`./routes/${file}`);
  if (typeof route === 'function' || typeof route === 'object' && route.use) {
    app.use('/api', route); // Mount the router at /api
  } else {
    console.error(`The module in ${file} is not a valid router`);
  }
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
