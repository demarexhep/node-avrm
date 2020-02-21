const express = require('express');
var app = express.Router();
const mongoose = require('mongoose');
const produkts = mongoose.model('produkts');

app.get('/', (req, res) => {
    res.render("produkts/addOrEdit", {
        viewTitle: "Insert Produkt"
    });
});

app.post('/', (req, res) => {
    if (req.body._id == '')
        insertProdukt(req, res);
    else
        updateProdukt(req, res);
});


function insertProdukt(req, res) {
    var produkt = new produkts();
    produkt.ime = req.body.ime;
    produkt.proizvoditel = req.body.proizvoditel;
    produkt.cena = req.body.cena;
    produkt.tezina = req.body.tezina;
    produkt.parcinja = req.body.parcinja;
    produkt.save((err, doc) => {
        if (!err) {
            res.redirect('produkts/list');
        }
        else {
            console.log('Error during record insertion : ' + err);
        }
    });
}

function updateProdukt(req, res) {
    produkts.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('produkts/list'); }

        else {
            console.log('Error during record update : ' + err);
        }
    });
}


app.get('/list', (req, res) => {
    produkts.find((err, docs) => {
        if (!err) {
            res.render("produkts/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});




app.get('/:id', (req, res) => {
    produkts.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("produkts/addOrEdit", {
                viewTitle: "Update Produkt",
                produkts: doc
            });
        }
    });
});

app.get('/delete/:id', (req, res) => {
    produkts.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/produkts/list');
        }
        else { console.log('Error in produkt delete :' + err); }
    });
});

module.exports = app;