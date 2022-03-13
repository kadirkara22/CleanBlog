const express = require('express');
const ejs = require('ejs');
const path = require('path')
const Post = require('./modals/Post');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/cleanblog-test-db')

app.set("view engine", "ejs");
app.use(express.static('public'))

app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
        posts
    })
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/add_post', (req, res) => {
    res.render('add_post')
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/posts', async (req, res) => {
    await Post.create(req.body)
    res.redirect('/')
})


const port = 5000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı...`)
})