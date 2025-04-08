const express = require("express");
const cors = require("cors");
const path = require('path');
const userRoutes = require("./routes/userRoutes");
const personRoutes = require("./routes/personRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use("/api/users", userRoutes);
app.use("/api/person", personRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});