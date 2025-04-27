import { config } from 'dotenv'
import path from 'path'
import mongoose from 'mongoose'

// 加载环境变量
config({ path: path.resolve(process.cwd(), '.env.local') })

async function testConnection() {
  try {
    console.log('正在连接到MongoDB...')
    console.log('URI:', process.env.MONGODB_URI)
    
    const connection = await mongoose.connect(process.env.MONGODB_URI!)
    console.log('MongoDB连接成功!')
    
    // 列出所有集合
    if (connection.connection.db) {
      const collections = await connection.connection.db.collections()
      console.log('\n现有的集合:')
      for (let collection of collections) {
        console.log(collection.collectionName)
      }
    }

    // 测试创建一个简单的文档
    const testSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now }
    })
    
    // 确保模型不会重复定义
    const Test = mongoose.models.Test || mongoose.model('Test', testSchema)
    
    // 创建测试文档
    const testDoc = await Test.create({ name: 'test' })
    console.log('\n创建的测试文档:', testDoc)
    
    // 关闭连接
    await mongoose.disconnect()
    console.log('\n连接已关闭')
  } catch (error) {
    console.error('连接错误:', error)
    if (error instanceof Error) {
      console.error('错误详情:', error.message)
      console.error('错误堆栈:', error.stack)
    }
  } finally {
    // 确保连接被关闭
    try {
      await mongoose.disconnect()
    } catch (e) {
      console.error('关闭连接时出错:', e)
    }
  }
}

// 添加错误处理
testConnection().catch(error => {
  console.error('未捕获的错误:', error)
  process.exit(1) 