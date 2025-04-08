const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initializeDatabase } = require('./db/db');
const userRoutes = require('./routes/userRoutes');
const personRoutes = require('./routes/personRoutes');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', personRoutes);

app.use(express.static(path.join(__dirname, 'public'))); 


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

initializeDatabase();

app.listen(3000, () => {
  console.log('Server running on port 3000');
});