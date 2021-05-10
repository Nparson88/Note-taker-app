const express = require('express');
const fs = require('fs')
const path = require('path')
const app = express();

const PORT = process.env.PORT || 3000;
app.use("/assets", express.static("./assets"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => res.sendFile(path.join(__dirname, './index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './notes.html')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, './db.json')));

app.post('/api/notes', (req, res) => {
    let newNote = req.body
    let allNotes =  JSON.parse(fs.readFileSync("./db.json"));
    let listLength = (allNotes.length).toString();
    newNote.id = listLength
    allNotes.push(newNote)

    fs.writeFileSync('./db.json', JSON.stringify(allNotes))
    res.json(allNotes)
})

app.listen(PORT, () => console.log("Server listening on port " + PORT));
