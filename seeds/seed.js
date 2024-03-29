const sequelize = require('../config/connection');
const { User, Entry } = require('../models');

const userData = require('./userData.json');
const entryData = require('./entryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const entry of entryData) {
    await Entry.create({
      ...entry,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
