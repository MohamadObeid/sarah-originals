import dotenv from 'dotenv'
dotenv.config()

export default {
  PORT: 5000,
  //MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/sarahoriginals",
  MONGODB_URL: process.env.MONGODB_URL || "mongodb+srv://mohamad-baker-obeid:Beirut@GroupTT123@cluster0.rddec.mongodb.net/sarahoriginals?retryWrites=true&w=majority",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecrets ",
  accessKeyId: process.env.accessKeyId || 'AKIAURMZYOA53B55C46S',
  secretAccessKey: process.env.secretAccessKey || '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',
}