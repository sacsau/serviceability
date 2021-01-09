const express = require('express');
const router = express.Router();
const postService = require('./post.service');

// routes
router.get('/', getAll);
router.post('/add', add);

module.exports = router;


function getAll(req, res, next) {
    postService.getAll(req.body)
        .then(posts => res.json(posts))
        .catch(next);
}

function add(req, res, next) {
    postService.create(req.body)
    .then(() => res.json({ message: 'Post creation successful' }))
    .catch(next);
}