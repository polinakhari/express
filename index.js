const express = require('express');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 5000 
const logger = require("./middleware/logger");
const exphbs = require("express-handlebars")
const members = require("./members")

 // Отправить конкретную страницу 
// app.get("/", function(req,res) {
//     res.sendFile(path.join(__dirname, "public", "index.html"))
// });  
//HandleBars Middleeare
app.engine("handlebars", exphbs());
app.set('view engine', "handlebars");


// Body Praser Middlewerre 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Set static folder
//app.use(express.static(path.join(__dirname, "public", )));

//Homepage Route
app.get('/', (req,res) => res.render('index', {
    title: "Member App",
    members : members
}))

// init route
app.use("/api/members", require('./routes/api/members'))
// init middleware
app.use(logger);


app.listen(PORT);