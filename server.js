const express = require('express');
const fs = require('fs')
const path = require('path')
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = [];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, 'db.json')));

