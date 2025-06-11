const express = require('express');
const bodyParser = require('body-parser');

var todayLists = [];
const app = express()
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');
app.use(express.static('Public'))

app.get('/', function(req,res){

    var today = new Date();

    var options = {
        weekday : 'long',
        day : 'numeric',
        month : 'long',
    }
    var day = today.toLocaleDateString('en-US', options);
    res.render('list', {day: day, newListItems: todayLists});
});

app.post('/', function(req, res){
    
    todayList = req.body.itemList
    todayLists.push(todayList);

    res.redirect('/')
});

app.listen(3000, function(req, res){
    console.log('server running on port 3000')
});