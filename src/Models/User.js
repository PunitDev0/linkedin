import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  firstname:{
    type:String,
    default: ''
  },
  lastname:{
    type:String,
    default: ''
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
  backgroundImage: { type: String }, 
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
  about: { type: String },
  headline: { type: String },
  industry: { type: String },
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
  recommendations: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.models?.User || mongoose.model('User', UserSchema);

export default User;
