const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./router/index');
const cors = require('cors');
require ('./mongoose/db');
require('dotenv').config();
const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use(cors({
    origin: "*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  }));
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to the app' }) 
    })

// Start the server

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server listening at http://${HOSTNAME}:${PORT}`);
  });
