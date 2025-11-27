const User = require('../models/User');

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const admin = new User({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'Admin'
      });
      await admin.save();
      console.log('Admin user seeded');
    }
  } catch (err) {
    console.log('Seeding failed');
  }
};

module.exports = { seedAdmin };