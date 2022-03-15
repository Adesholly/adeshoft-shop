import mongoose from "mongoose"
import colors from "colors"

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.blue.underline.bold
    )
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold.underline)
    process.exit(1)
  }
}

export default connectDB
