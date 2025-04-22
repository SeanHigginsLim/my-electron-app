const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/router');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://seanhigginslim:hyrlSf75yqB4oC8t@deltavir.togym.mongodb.net/?retryWrites=true&w=majority&appName=Deltavir', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: { w: 'majority', j: true }
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Middleware
app.use(bodyParser.json({ limit: '10mb' })); // Increase JSON body limit
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Increase URL-encoded body limit

// Use Profile Routes
app.use('/api', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
