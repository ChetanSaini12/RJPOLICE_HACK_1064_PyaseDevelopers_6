import mongoose from 'mongoose'

const cameraSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const Camera = mongoose.model('Camera', cameraSchema)
