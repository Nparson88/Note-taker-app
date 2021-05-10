// required installs
const express = require('express');
const fs = require('fs')
const path = require('path')
const app = express();
// heroku port
const PORT = process.env.PORT || 3000;

app.use("/assets", express.static("./assets"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//routes to html pages and api
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './notes.html')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, './db.json')));
//post function to save notes
app.post('/api/notes', (req, res) => {
    let newNote = req.body
    let allNotes = JSON.parse(fs.readFileSync("./db.json"));
    let listLength = allNotes.length
    newNote.id = listLength + 1
    allNotes.push(newNote)

    fs.writeFileSync('./db.json', JSON.stringify(allNotes))
    res.json(allNotes)
})
//delete function
app.delete("/api/notes/:id", (req, res) => {
    let allNotes = JSON.parse(fs.readFileSync("./db.json"));
    let noteId = req.params.id
    // after deleting note, filter out the rest to display
    allNotes = allNotes.filter(data => {
        return data.id != noteId;
    })
    fs.writeFileSync("./db.json", JSON.stringify(allNotes));
    res.json(allNotes);
});

app.listen(PORT, () => console.log("Server listening on port " + PORT));
