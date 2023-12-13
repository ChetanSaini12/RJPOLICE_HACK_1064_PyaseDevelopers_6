import mongoose from 'mongoose'
import { DB_Name } from '../constant.js'
import 'dotenv/config'

const DB_URI = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${DB_URI}/${DB_Name}`)
    console.log(
      'Database Connected SUccessfully || DB Host : ',
      connectionInstance.connection.host
    )
  } catch (err) {
    console.log('Error while connecting database : ', err)
    process.exit(1)
  }
}

export {connectDB}
