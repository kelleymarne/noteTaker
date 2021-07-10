// API ROUTE
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const notes = require('../../db/db.json');

router.get('/notes', (req, res) => {
    let data = fs.readFileSync(path.join(__dirname, '../../db/db.json'), 'utf8');
    res.json(data)
});


router.post('/notes', (req, res) => {
    let data = fs.readFileSync(path.join(__dirname, '../../db/db.json'), 'utf8');
    let notesHistory = JSON.parse(data);
    console.log(notesHistory, typeof notesHistory)
    let newNote = req.body;
    notesHistory.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(notesHistory));
    res.json('Note has been added!')
});

module.exports = router;