const express = require('express');
const dotenv = require('dotenv').config(); // Fixed the spelling
const cors = require('cors');
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')

//database connection
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('database connected'))
.catch((err) =>console.log('database not connected',err))

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

// Middleware for CORS
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173', // Corrected origin URL
  })
);

// Route Middleware
app.use('/', require('./routes/authRoutes'));

// Define the port from .env or default to 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
