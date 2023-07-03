const router = require('express').Router();
const { Entry } = require('../../models');
const withAuth = require('../../utils/loggedIn');

router.post('/', withAuth, async (req, res) => {
  try {
    const { title, text, imageUrl } = req.body;

    const newEntry = await Entry.create({
      title,
      text,
      image_url: imageUrl, 
      user_id: req.session.user_id,
    });

    res.status(200).json(newEntry);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const entryData = await Entry.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!entryData) {
      res.status(404).json({ message: 'No entry found with this id!' });
      return;
    }

    res.status(200).json(entryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
