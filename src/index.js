const express = require('express');
const morgan = require('morgan');
const { validate, ValidationError, Joi } = require('express-validation')

const textValidation = {
    body: Joi.object({
        text: Joi.string().required()
    }),
}



const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/getText', validate(textValidation, {}, {}), (req, res) => {

    res.json({response: req.body.text});
})

module.exports = app