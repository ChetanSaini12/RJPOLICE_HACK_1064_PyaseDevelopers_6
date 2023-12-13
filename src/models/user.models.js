import mongoose from 'mongoose'

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
    aadharNum: {
      type: String,
      required : true,
      match: [/^\d{12}$/, 'Aadhar number must be a 12-digit number']
    },
  },
  {
    timestamps: true,
  }
)

export const User = mongoose.model('User', userSchema)
