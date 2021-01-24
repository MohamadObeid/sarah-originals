import dotenv from 'dotenv'
dotenv.config()

export default {
  PORT: process.env.PORT,// || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/sarahoriginals',
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecrets ",
  accessKeyId: process.env.accessKeyId || 'AKIAURMZYOA53B55C46S',
  secretAccessKey: process.env.secretAccessKey || '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',
}