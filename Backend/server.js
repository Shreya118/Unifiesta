const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./models');
require('./cron');

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const registrationRoutes = require('./routes/registrations');
const userRoutes = require('./routes/users');

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/registrations', registrationRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));