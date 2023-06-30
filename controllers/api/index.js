const router = require('express').Router();
const userRoutes = require('./userRoutes');
const entryRoutes = require('./entryRoutes');
const libraryRoutes = require('./libraryRoutes');

router.use('/users', userRoutes);
router.use('/entries', entryRoutes);
router.use('/library', libraryRoutes);

module.exports = router;