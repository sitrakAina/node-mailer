const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const config = require('./config/database.config')
const mongoose = require('mongoose')
const mailer = require("nodemailer");

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require('./routes/profile.route')(app);
mongoose.Promise = global.Promise;
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//mailer
var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "sitrakaniaina812@gmail.com",
        pass: "aina310196"
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Fred Foo ✔ <sitrakaniaina812@gmail.com", // sender address
    to: "ainarakoto818@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Profil app" });
});

app.listen(8080, () => {
    console.log("Server demarer sur le port 8080");
});

module.exports = app;