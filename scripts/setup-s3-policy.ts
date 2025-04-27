import { S3Client, PutBucketPolicyCommand, PutPublicAccessBlockCommand } from '@aws-sdk/client-s3'
import { config } from 'dotenv'
import path from 'path'

// 加载环境变量
config({ path: path.resolve(process.cwd(), '.env.local') })

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

async function setupBucketPolicy() {
  try {
    // 1. 移除阻止公共访问的设置
    await s3Client.send(new PutPublicAccessBlockCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false,
        IgnorePublicAcls: false,
        BlockPublicPolicy: false,
        RestrictPublicBuckets: false
      }
    }))
    
    console.log('已移除公共访问限制')

    // 2. 设置存储桶策略
    const bucketPolicy = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'PublicReadGetObject',
          Effect: 'Allow',
          Principal: '*',
          Action: [
            's3:GetObject'
          ],
          Resource: [
            `arn:aws:s3:::${process.env.AWS_S3_BUCKET}/*`
          ]
        }
      ]
    }

    await s3Client.send(new PutBucketPolicyCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Policy: JSON.stringify(bucketPolicy)
    }))

    console.log('S3 存储桶策略设置成功')
  } catch (error) {
    console.error('设置存储桶策略失败:', error)
    if (error instanceof Error) {
      console.error('错误详情:', error.message)
      console.error('错误堆栈:', error.stack)
    }
  }
}

// 运行设置
setupBucketPolicy().catch(error => {
  console.error('未捕获的错误:', error)
  process.exit(1)
}) 