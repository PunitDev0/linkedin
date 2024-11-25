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
  image: { type: String }, 
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
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: function() {
        return !this.isCurrentlyWorking; // If not currently working, endDate is required
      },
    },
    isCurrentlyWorking: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      default: '', // Optional location field
    },
    locationType: {
      type: String,
      enum: ['on-site', 'remote', 'hybrid'],
      required: [true, 'Location type is required'],
    },
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'self-employed', 'freelance', 'contract', 'internship', 'apprenticeship', 'seasonal'],
      required: [true, 'Employment type is required'],
    },
    description: {
      type: String,
      default: '', // Optional description field
    },
  }],
  about: { type: String },
  headline: { type: String },
  industry: { type: String },
  currentPosition: {type: String },

  education: [{
    school: String,
    degree: String,
    field_of_study: String,
    startMonth: Date,
    startYear: Date,
    endhMonth: Date,
    endYear: Date,
  }],
  contact:[{
    phone: Number,
    address: String,
    month: Number,
    day: Number,
    year: Number
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
