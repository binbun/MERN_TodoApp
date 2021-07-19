import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String
  },
  email: {
    unique: true,
    type: String
  },
  password: {
    unique: true,
    type: String
  },
  isAdmin: {
    type: Boolean, 
    default: false
  }
})

const User = mongoose.model('User', userSchema);

export default User;