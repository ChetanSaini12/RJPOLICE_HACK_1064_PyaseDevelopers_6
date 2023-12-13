import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
      unique: true,
      match: [/^[0-9]{10,14}$/, 'Invalid phone number format'],
    },
    password : {
      type : Stirng,
      required : true
    },
    position: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)


adminSchema.pre('save', async function (next) {
  if(!this.isModified(this.password)) return next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

adminSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password)
}

adminSchema.methods.generateAccessToken = async function() {
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

export const Admin = mongoose.model('Admin', adminSchema)
