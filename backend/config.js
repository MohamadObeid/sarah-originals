import dotenv from 'dotenv'
dotenv.config()

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || "mongodb+srv://mohamad-baker-obeid:Beirut@GroupTT123@cluster0.rddec.mongodb.net/sarahoriginals?retryWrites=true&w=majority",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecrets ",
  accessKeyId: process.env.accessKeyId || 'AKIAQO7A6VVSR24A262L',
  secretAccessKey: process.env.secretAccessKey || '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',
}