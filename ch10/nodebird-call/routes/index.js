const express = require('express');
const { searchByHashtag, getMyPosts, renderMain, getFollowers, getFollowings, test } = require('../controllers');
const router =express.Router();

router.get('/test',test);

router.get('/search/:hashtag',searchByHashtag);

router.get('/myposts',getMyPosts);

router.get('/myFollowers',getFollowers);

router.get('/myFollowings',getFollowings);

router.get('/', renderMain);

module.exports = router;