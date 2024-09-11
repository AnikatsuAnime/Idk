const express = require('express');
const path = require('path');
const session = require('express-session');
const fetch = require('node-fetch');
const app = express();
const config = require('./config');

// Middleware for sessions
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Home Route
app.get('/', async (req, res) => {
    // Fetch anime data (e.g., recent-release)
    const apiResponse = await fetch(`${config.api}/recent-release?type=1&page=1`);
    const recentSubbed = await apiResponse.json();

    const apiDubbed = await fetch(`${config.api}/recent-release?type=2&page=1`);
    const recentDubbed = await apiDubbed.json();

    const userHistory = req.session.userHistory || []; // Replace MySQL with session-based history

    res.render('index', {
        websiteTitle: config.websiteTitle,
        websiteUrl: config.websiteUrl,
        banner: config.banner,
        recentSubbed,
        recentDubbed,
        userHistory
    });
});

// Other routes can be added here for dynamic pages, such as '/watch/:id'.

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
