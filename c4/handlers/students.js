const fs = require('fs');
const STUDENTS_FILE = './students.json';

const read = (file) => {

    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) return reject('Cannout read file', err);
            return resolve(data);
        });
    });
}

const write = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) return reject("Cannot write file", err);
            return resolve();
        })
    })
}



const getStudents = (req, res) => {
    read(STUDENTS_FILE)
        .then((data) => {
            let out = {
                students: JSON.parse(data)
            }
            res.render('students', out);
        })
        .catch((err) => {
            res.status(500).send("Could not read file");
        })
}


//Post student with button
const postStudents = (req, res) => {
    read(STUDENTS_FILE)
        .then((data) => {
            let students = JSON.parse(data);
            //push the new object to the array
            students.push({
                id: new Date().getTime(),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                address: req.body.address,
                avg_grade: Number(req.body.avg_grade)
            })
            return write(STUDENTS_FILE, JSON.stringify(students));
        })
        .then(() => {
            res.redirect('/students');
        })

        .catch((err) => {
            res.status(500).send('Could not write file', err);
        })
}



const editStudents = (req, res) => {
    read(STUDENTS_FILE)
        .then((data) => {
            //convert json data to javascript array
            let students = JSON.parse(data);

            for (let i = 0; i < students.length; i++) {
                if (students[i].id == req.body.id) {
                    //console.log(req.body.id);
                    let updated = {
                        id: req.body.id,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        address: req.body.address,
                        avg_grade: Number(req.body.avg_grade)
                    };
                    students.splice(i, 1, updated);
                }
            }
            return write(STUDENTS_FILE, JSON.stringify(students));
        })

        .then(() => {
            res.redirect('/students');
        })
        .catch((err) => {
            console.log(err);
        })
}



const deleteStudents = (req, res) => {

    read(STUDENTS_FILE)
        .then((data) => {
            let students = JSON.parse(data);
            for (let i = 0; i < students.length; i++) {
                if (students[i].id == req.body.id) {
                    //console.log(req.body.id);
                    students.splice(i, 1);
                }
            }
            return write(STUDENTS_FILE, JSON.stringify(students));
        })
        .then(() => {
            res.redirect('/students');
        })
        .catch((err) => {
            console.log(err);

        })

}



module.exports = {

    getStudents,

    postStudents,

    editStudents,

    deleteStudents

}