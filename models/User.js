import validator from 'validator';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    default: 'lastname',
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    default: 'my city',
  },
});

userSchema.pre('save', async function () {
  const user = this;
  if (!user.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

userSchema.methods.createJWT = function () {
  const user = this;
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  const isMatch = await bcrypt.compare(candidatePassword, user.password);
  return isMatch;
};

export default mongoose.model('User', userSchema);
