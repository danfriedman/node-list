var express = require('express');
var bodyparser = require('body-parser');
var jsonparser = bodyparser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.delete = function(i) {
    var toDelete = this.items[i];
    this.items.splice(i, 1);
    return toDelete;   
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonparser, function(req, res) {
    if(!req.body) {
        return res.status(400);
    }
    
    var item = storage.add(req.body.name);
    res.status(200).json(item);
});

app.delete('/items/:id', function(req, res) {
    var id = req.params.id;
    
    for (var i=0; i<storage.items.length; i++) {
        if (id == storage.items[i].id) {
            var toDelete = storage.delete(i);
            return res.status(200).json(toDelete);
        }
    }
    
    return res.status(400);
    
});

app.put('/items/:id', jsonparser, function(req, res) {
    var id = req.params.id;
    
    for(var i=0; i<storage.items.length; i++) {
       if(id == storage.items[i].id){
           storage.items[i].name = req.body.name;
           return res.status(200).json(storage.items[i].name);
       }
   }
   
   return res.status(400);
});

app.listen(8080);