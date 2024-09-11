const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();

const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    try {
        const apiUrl = process.env.API_URL;
        const response = await fetch(`${apiUrl}/recent-release?type=1&page=1`);
        const recentSubs = await response.json();
        const responseDub = await fetch(`${apiUrl}/recent-release?type=2&page=1`);
        const recentDubs = await responseDub.json();

        res.render('index', {
            websiteTitle: process.env.WEBSITE_TITLE,
            websiteUrl: process.env.WEBSITE_URL,
            banner: process.env.BANNER_URL,
            version: process.env.VERSION,
            recentSubs,
            recentDubs
        });
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
