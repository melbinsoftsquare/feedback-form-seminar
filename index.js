// Require All Dependencies
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const service = require('./service');

// The port address used to listen for Web Requests. The default is set as 4000.
const port = process.env.PORT || 4000;

let app = express();

// Set render engin. A render engin will transform a template into an HTML page which will be rendered in web pages.
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: ''}));
app.set('view engine', '.hbs');

// Set a static folder to read images, icons, any files to download
app.use(express.static(path.join(__dirname, 'public')));

// Parse POST requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Submit feedback forms
app.post('/feedback', (req, res) => {
    // TODO: Send Request vlaues to create the feedback
    service.createFeedback()
    .then(() => {
        // Render Success message. filename - success-message
        res.render();
    })
    .catch((err) => {
        console.log(err);
        // Render Error message. filename - error-message
        res.render();
    });
    
});

// View all submitted feedbacks
app.get('/view-feedbacks', (req, res) => {
    let page = req.query.page;
    page = page || 1;
    service.getFeedbacks(page)
    .then((result) => {
        // Validation to prevent the pagination number is wrong.
        let hasNextPage = false;
        if (result.length > 10) {
            hasNextPage = true;
            result.splice(10, 1);
        }

        // TODO: Render the page with queried results
        res.render('view-feedback-list', {feedbacks: '', hasNextPage: hasNextPage, hasPreviousPage: page > 1, prevPage: parseInt(page) - 1, nextPage: parseInt(page) + 1, page: page});
    });
});

// View a single feedbacks
app.get('/view-feedback', (req, res) => {
    let feedbackId = req.query.feedbackId;
    if(isNaN(parseInt(feedbackId)) === false) {
        // TODO: Pass it to get the feedback id
        service.getFeedback()
        .then((result) => {
            // TODO: Send the feedback record to render it to the page. {feedback: ''}
            res.render('view-feedback', {});
        })
        .catch(err => {
            console.log(err);
            res.render('error-message', {message: err});
        });
    } else {
        res.render('error-message', {message: 'Feedback Id should be valid.'});
    }
})

// Delete a feedback
app.get('/delete', (req, res) => {

});

// Delete All Feedbacks
app.get('/delete-all', (req, res) => {

});

// Send the initital page to the browser
app.get('/', (req, res) => {
    res.render('submit-form');
});

// TODO: Add the port number to add the listener
app.listen('', () => {
    console.log('App Listening at', port);
});
