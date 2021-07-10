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
    let data = fs.readFileSync(path.join(__dirname, '../../db/db.json'), 'utf8');
    let notesHistory = JSON.parse(data);
    // console.log(notesHistory, typeof notesHistory)
    // let newNote = req.body;
    let newNote = {
        title: req.body.title,
        text: req.body.text,
    };

    notesHistory.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(notesHistory));
    return res.json(notesHistory);
});

module.exports = router;