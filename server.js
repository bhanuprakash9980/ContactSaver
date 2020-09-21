const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8000;

//connect Database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

//Define Routes

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(__dirname, 'client', 'build', 'index.html');
  });
}

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
