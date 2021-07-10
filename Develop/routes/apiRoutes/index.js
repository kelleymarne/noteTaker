// API ROUTE
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const notes = require('../../db/db.json');

router.get('/notes', (req, res) => {
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../db/db.json'), 'utf8'));
    return res.json(data)
});


router.post('/notes', (req, res) => {
    let notesArray = JSON.parse(fs.readFileSync(path.join(__dirname, '../../db/db.json'), 'utf8'));
    let newNote = req.body;
    // let newNote = {
    //     title: req.body.title,
    //     text: req.body.text,
    // };
    notesArray.push(newNote);
    let id = 0;
    notesArray.forEach((note) => {
        note.id = id;
        id++;
        return notesArray;
    });

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notesArray), err => {
            if (err) throw err;
        });
    return res.json(notesArray);


    
});

router.delete('/notes/:id', (req, res) => {
    const deleteNote = req.params.id;
    for (let i = 0; i < notes.length; i++) {
        if(notes[i].id === Number(deleteNote)) {
            notes.splice(i, 1);
        };
       fs.writeFile(path.join(__dirname, '../../db/db.json'), (err) => {
           if (err) throw err;
       });
    }
});


module.exports = router;