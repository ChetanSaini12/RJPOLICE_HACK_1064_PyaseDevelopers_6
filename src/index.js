import { app } from './app.js'
import { connectDB } from './db/connectDB.js'
import 'dotenv/config'

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server is running on PORT : ', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log('MongoDB Connection Failed!! ', error)
  })
