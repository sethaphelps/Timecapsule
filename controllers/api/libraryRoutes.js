const router = require('express').Router();
const { Library } = require('../../models');
const withAuth = require('../../utils/loggedIn');

router.get('/library', (req, res) => {
    res.render('library');
  });

  module.exports = router;