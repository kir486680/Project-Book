const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// Stories Index
router.get('/', (req, res) => {
  res.render('stories/index');
});

// Add Story Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

// add story
router.post('/' , (req, res)=>{
let allowcomments;

if(req.body.allowcomments){
  allowcomments = true;
}else{
  allowcomments = false;
}

const newStory = {
  title: req.body.title,
  body : req.body.body,
  status : req.body.status,
  allowcomments: allowcomments,
  user: req.user.id
}
new newStory(newStory)
.save()
.then(story =>{
  res.redirect(`/stories/show/${story.id}`);
});

});

module.exports = router;