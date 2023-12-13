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
    position: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Admin = mongoose.model('Admin', adminSchema)
