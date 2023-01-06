import mongoose from 'mongoose'

export async function connectToMongoDB() {
  const connectionString = process.env.MONGO_URI as string

  console.log(`Connecting to ${connectionString}`)

  try {
    await mongoose.connect(connectionString)

    console.log('Database connection established.')
  } catch (err) {
    console.error(`Could not establish connection to ${connectionString}`)

    throw err
  }
}
