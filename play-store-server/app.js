const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(morgan('common'));

const applist = require('./appList.js');

app.get('/apps', (req, res) => {
    const { genres, sort = "" } = req.query;

    if(!genres){
        return res.status(400).send('you need to pick a genre')
    }

    const genreFilteredApps = applist.filter(filtered => 
        filtered.Genres.toLowerCase().includes(genres.toLowerCase()));

    if (sort) {
        genreFilteredApps.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0; 
        })
    }

    res.json(genreFilteredApps);
});

app.listen(8000, () => {
    console.log('server starting port8000');
});