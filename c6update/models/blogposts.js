const mongoose = require('mongoose');

const Blogposts = mongoose.model(
    'Blogposts',
    {
        email: String,
        content: String,
        
    },
    'Blogposts'
);

const readAll = () => {
    return new Promise((success, fail) => {
        Blogposts.find({}, (err, data) => {
            if (err) {
                return fail(err)
            }
            return success(data)
        })
    })
}

const readOne = (id) => {
    return new Promise((success, fail) => {
        Blogposts.findById(id, 'first_name last_name content', (err, data) => {
            if (err) {
                return fail(err)
            }
            return success(data)
        })
    })
}

const createNew = (data) => {
    return new Promise((success, fail) => {
        let blog = new Blogposts(data);
        blog.save((err) => {
            if (err) {
                return fail(err)
            }
            return success()
        })
    })
}

const remove = (id) => {
    return new Promise((success, fail) => {
        Blogposts.deleteOne({ _id: id }, (err) => {
            if (err) {
                return fail(err)
            }
            return success()
        })
    })
}

const update = (id, data) => {
    return new Promise((success, fail) => {
        Blogposts.updateOne({_id: id}, data, (err)=>{
            if(err){
                return fail(err)
            }
            return success()
        })
    })
}

module.exports = {
    readAll,
    readOne,
    createNew,
    remove,
    update
}