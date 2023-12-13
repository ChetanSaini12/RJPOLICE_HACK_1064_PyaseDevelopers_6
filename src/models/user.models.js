import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._-]{2,}@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
        'Invalid email format',
      ],
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^[0-9]{10,14}$/, 'Invalid phone number format'],
    },
    password : {
      type: String,
      required: true
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: {
        type: String,
        required: true,
      },
    },
    camera: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Camera' }],
    aadharNumber: {
      type: String,
      required : true,
      match: [/^\d{12}$/, 'Aadhar number must be a 12-digit number']
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  if(!this.isModified(this.password)) return next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function() {
  return jwt.sign(
    {
      _id : this._id,
      username : this._username,
      email : this.username,
      fullName : this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn : process.env.ACESS_TOKEN_EXPIRY
    }
  )
}

export const User = mongoose.model('User', userSchema)
