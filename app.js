const express = require('express');
const ejs = require('ejs');
const path = require('path')
const methodOverride = require('method-override')
const Post = require('./modals/Post');
const mongoose = require('mongoose');

const postControllers = require('./controllers/postControllers')
const pageControllers = require('./controllers/pageControllers')

const app = express();

mongoose.connect('mongodb://localhost/cleanblog-test-db')

app.set("view engine", "ejs");

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))

app.get('/', postControllers.getAllPosts)
app.get('/posts/:id', postControllers.getPosts)
app.post('/posts', postControllers.createPost)
app.put('/posts/:id', postControllers.updatePost);
app.delete('/posts/:id', postControllers.deletePost)

app.get('/about', pageControllers.getAboutPage)

app.get('/add_post', pageControllers.getAddPage)

app.get('/posts/edit/:id', pageControllers.getEditPage)



const port = 5000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı...`)
})