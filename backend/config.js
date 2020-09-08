export default {
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/sarahoriginals",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecrets ",
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};