const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    ime: {
        type: String

    },
    proizvoditel: {
        type: String

    },
    cena: {
        type: Number

    },
    tezina: {
        type: Number

    },
    parcinja: {
        type: Number

    }

});

const Produkt = mongoose.model('produkts', employeeSchema);

const readAll = () => {
    return new Promise((success, fail) => {
        Produkt.find({}, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    })
}
const reader = (req, res) => {
    readAll()
        .then(data => {
            res.render('produkts', { produkts: data })
        })
        .catch(err => {
            console.log('Error has occured while reading from DB')
            res.status(500).send('Could not read from DB')
            return
        })
}
const createNew = (data) => {
    return new Promise((success, fail) => {
        let p = new Produkt(data)

        p.save((err) => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    })
}
const creator = (req, res) => {
    var item = {
        ime: req.body.ime,
        proizvoditel: req.body.proizvoditel,
        cena: req.body.cena,
        tezina: req.body.tezina,
        parcinja: req.body.parcinja
    }
    createNew(item)
        .then(() =>
            res.redirect('/')
        )
        .catch(err => {
            console.log('Error has occured while creating new Item')
            res.status(500).send('Could not create new item')
            return
        })
}

const removeItem = (id) => {
    return new Promise((success, fail) =>
        Produkt.deleteOne({ _id: id }, (err) => {
            if (err) {
                return fail(err);
            }
            return success();
        }))
}

const deleter = (req, res) => {
    let id = req.body._id
    removeItem(id)
        .then(() =>
            res.redirect('/')
        )
        .catch(err => {
            console.log('Error has occured while creating new Item')
            res.status(500).send('Could not create new item')
            return
        })
}

const updateItem = (id, data) => {
    return new Promise((success, fail) => {
        Produkt.updateOne({ _id: id }, data, (err) => {
            if (err) {
                return fail(err)
            }
            return success()
        })
    })
}
const updater = (req, res) =>{
    let id = req.body.idUp
    let data = {
        ime: req.body.imeUp,
        proizvoditel: req.body.proizvoditelUp,
        cena: Number(req.body.cenaUp),
        tezina:  Number(req.body.tezinaUp),
        parcinja: Number(req.body.parcinjaUp)
    }
    //updateItem(id,data)
    //res.redirect('/')
    return new Promise((success, fail)=>{
        Produkt.updateOne({_id: id}, data, (err)=>{
            if(err){
                return fail(err);
            }
            return success();
        })
        res.redirect('/')
    })
}

module.exports = {
    readAll,
    createNew,
    removeItem,
    updateItem,
    reader,
    creator,
    deleter,
    updater,
    }