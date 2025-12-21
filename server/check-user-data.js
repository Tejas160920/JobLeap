/**
 * Quick script to check user data in MongoDB
 * Run with: node check-user-data.js
 */

require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const User = require('./models/User');

const EMAIL = 'tejassgaikwad51@gmail.com';

async function checkUserData() {
  try {
    console.log('Connecting to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGO_URI ? 'Found' : 'NOT FOUND');

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    const user = await User.findOne({ email: EMAIL });

    if (!user) {
      console.log(`❌ No user found with email: ${EMAIL}`);
      return;
    }

    console.log(`✅ User found: ${EMAIL}`);
    console.log(`   ID: ${user._id}`);
    console.log(`   Created: ${user.createdAt}`);
    console.log(`   Profile Completed: ${user.profileCompleted}`);
    console.log('\n--- AutoFill Profile Data ---');

    const ap = user.autofillProfile;
    if (!ap || Object.keys(ap).length === 0) {
      console.log('❌ autofillProfile is EMPTY or undefined');
    } else {
      console.log('✅ autofillProfile exists:');
      console.log(`   firstName: "${ap.firstName || '(empty)'}"`);
      console.log(`   lastName: "${ap.lastName || '(empty)'}"`);
      console.log(`   education: ${ap.education?.length || 0} entries`);
      console.log(`   experience: ${ap.experience?.length || 0} entries`);
      console.log(`   skills: ${ap.skills?.length || 0} skills`);
      console.log(`   links: ${JSON.stringify(ap.links || {})}`);
      console.log(`   personal: ${JSON.stringify(ap.personal || {})}`);
      console.log(`   workAuthorization: ${JSON.stringify(ap.workAuthorization || {})}`);
      console.log('\n--- Full autofillProfile ---');
      console.log(JSON.stringify(ap, null, 2));
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

checkUserData();
