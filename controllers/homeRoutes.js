const router = require('express').Router();
const { Entry, User } = require('../models');
const withAuth = require('../utils/loggedIn');
router.get('/entry', async (req, res) => {
  try {
    // Get all entries and JOIN with user data
    const entryData = await Entry.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const entries = entryData.map((entry) => entry.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('entryList', { 
      entries, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/entry/:id', async (req, res) => {
  try {
    const entryData = await Entry.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const entry = entryData.get({ plain: true });

    res.render('entries', {
      ...entry,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Entry }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('homepage');
// });

router.get('/new-entry', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  res.render('create');
});

router.get('/library', async (req, res) => {
  // find all the images in the entries?
  const imageDataArray = await Entry.findAll({
    attributes: ['id', 'image_url', 'date_created']
  })

  const images = imageDataArray.map( obj => obj.get({plain: true}));
  // console log what imageData looks like?
  console.log('images is', images);
  res.render('library', { images });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
