const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(morgan('combined'));

app.use(express.json());

app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

app.use('/api', require('./routes/bidRoutes'));
app.use('/api', require('./routes/healthRoutes'));

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
    console.log(`Mock server listening on http://localhost:${port}`);
});
