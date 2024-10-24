import { Type } from 'lucide-react';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstname:{
    type:String,
    default: ''
  },
  lastname:{
    type:String,
    default: ''
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  pronouns:{
   type:String
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
  profilePicture: {
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
  bio: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
  city:{
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
  currentPosition: {type: String },
  education: [{
    school: String,
    degree: String,
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date,
  }],
  contact:[{
    phone: Number,
    address: String,
    month: Number,
    day: Number,
    year: Number,
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
