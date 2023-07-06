const router = require('express').Router();
const { Entry, User } = require('../models');
const withAuth = require('../utils/loggedIn');
router.get('/entry', async (req, res) => {
  try {
    const entryData = await Entry.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const entries = entryData.map((entry) => entry.get({ plain: true }));

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


router.get('/profile', withAuth, async (req, res) => {
  try {
    
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

router.get('/', (req, res) => {
  
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('homepage');
});

router.get('/new-entry', (req, res) => {
  
  res.render('create');
});

router.get('/library', async (req, res) => {
  
  const imageDataArray = await Entry.findAll({
    attributes: ['id', 'image_url', 'date_created']
  })

  const images = imageDataArray.map( obj => obj.get({plain: true}));
  
  console.log('images is', images);
  res.render('library', { images });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
