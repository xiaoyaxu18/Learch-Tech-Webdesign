import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string
const client = new MongoClient(uri)
let cachedDb: any = null

export const clientPromise = client.connect()

export async function getDb() {
  if (!cachedDb) {
    await client.connect()
    cachedDb = client.db()  // 默认数据库名称从 URI 中获取
  }
  return cachedDb
}