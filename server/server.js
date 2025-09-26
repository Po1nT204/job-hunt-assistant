const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Подключаем роуты
app.use('/api/auth', authRoutes);
app.use('/api/vacancies', require('./routes/vacancyRoutes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
