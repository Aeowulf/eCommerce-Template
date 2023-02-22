import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
}, {
  timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword) {
/* Creating password matching method */
  return await bcrypt.compare(enteredPassword, this.password)
  // Compares entered password with encrypted password in database for this user
}

const User = mongoose.model('User', userSchema)

export default User