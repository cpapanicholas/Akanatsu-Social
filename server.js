const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/my-social-network', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define routes (user, thought, and reaction routes)
app.use('/api/users', require('./routes/user-routes'));
app.use('/api/thoughts', require('./routes/thought-routes'));
app.use('/api/thoughts/:thoughtId/reactions', require('./routes/reaction-routes'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});