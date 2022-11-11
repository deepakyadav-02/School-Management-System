import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
     
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)
adminSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('reached here')
  return await  enteredPassword==this.password
}
const Admin = mongoose.model('admin', adminSchema)
export default Admin
