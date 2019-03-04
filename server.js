const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getFullYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});



app.get('/', (req, res) => {
    // res.send({
    //     name: 'Jinendra',
    //     likes: [
    //         'Programming',
    //         'Listening Songs'
    //     ]
    // });

    res.render('home.hbs', {
        message: 'Welcome to home page',
        pageTitle: 'Home Page',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        message: 'Unable to fulfill request',
    })
})

app.listen(3000, () => {
    console.log('Server is up and running.');
});