import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    try {
      cached.promise = mongoose.connect(MONGODB_URI, opts)
      console.log('MongoDB connecting...')
      cached.conn = await cached.promise
      console.log('MongoDB connected successfully')
    } catch (e) {
      cached.promise = null
      console.error('MongoDB connection error:', e)
      throw e
    }
  }

  return cached.conn
}

export default dbConnect 