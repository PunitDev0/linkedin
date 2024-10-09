import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  image:{
    type: String,
    default: 'default-profile-picture-url',
  },
  googleId: {
    type: String,
    default: '',
    sparse: true, // Allows multiple null values
  },
  twitterId: {
    type: String,
    default: '',
    sparse: true,
  },
  githubId: {
    type: String,
    default: '',
    sparse: true,
  },
  profilePicture: {
    type: String,
    default: 'default-profile-picture-url',
  },
  bio: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  website: {
    type: String,
    default: '',
  },
  skills: [{
    type: String,
  }],
  experience: [{
    title: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: String,
  }],
  education: [{
    school: String,
    degree: String,
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date,
  }],
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Uncomment these if you want password hashing and comparison
// UserSchema.pre('save', async function (next) {
//   const user = this;
//   if (!user.isModified('password')) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//     next();
//   } catch (err) {
//     return next(err);
//   }
// });

// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// The fix: Prevent model overwrite issue
const User = mongoose.models?.User || mongoose.model('User', UserSchema);

export default User;
