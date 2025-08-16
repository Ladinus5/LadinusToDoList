const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const  ejs  = require('ejs');
let todayList = []

const app = express()
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');
app.use(express.static('Public'))

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser : true});

const itemsSchema = {
    name : String
}
const Item = mongoose.model('Item', itemsSchema);

const Item1 = new Item ({
    name : 'Morning Jugging'
});

const Item2 = new Item ({
    name : 'Write Code'
});

const Item3 = new Item ({
    name : 'Go to School'
});

const defaultItems = [Item1, Item2, Item3]

const listSchema = {
    name : String,
    items : [itemsSchema]
};

const List = mongoose.model('List', listSchema);

app.get('/', function(req,res){

    var today = new Date();

    var options = {
        weekday : 'long',
        day : 'numeric',
        month : 'long',
    }
    var day = today.toLocaleDateString('en-US', options);
        Item.find().then(function(foundItem) {
            if (foundItem.length === 0) {
                Item.insertMany(defaultItems)
                .then(() => {
                    res.redirect('/')
                })
                .catch(err => console.log(err))
            } else {
                res.render('list', {day: day, newListItems: foundItem});
            }
        }).catch(function(err) {
            console.log(err)
        });
});

app.post('/', function(req, res){
    
    todayList = req.body.itemList
    const item = new Item ({
        name : todayList
    });
    item.save();

    res.redirect('/')
});

app.get('/:customTodo', function(req, res) {
    const customTodoList = req.params.customTodo

    List.findOne

    const list1 = new List ({
        name : customTodoList,
        items : defaultItems
    });
    list1.save()
});

app.post('/delete', function(req, res) {
const checkedItem = req.body.checkeditem;
     Item.findByIdAndDelete(checkedItem)
    .then(() => {
      console.log("Item successfully deleted");
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Error deleting item:", err);
    });
});

app.listen(3000, function(req, res){
    console.log('server running on port 3000')
});