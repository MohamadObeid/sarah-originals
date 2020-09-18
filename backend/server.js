import express from "express";
import config from "./config";
import path from 'path';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import logger from 'morgan'
import cors from 'cors';
import methodOverride from 'method-override'
mongoose.Promise = require('bluebird');

import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import orderRoute from './routes/orderRoute';
import categoryRoute from './routes/categoryRoute';
import brandRoute from './routes/brandRoute';
import zoneRoute from './routes/zoneRoute';
import paymentRoute from './routes/paymentRoute';
import deliveryRoute from './routes/deliveryRoute';
import employeeRoute from './routes/employeeRoute';
import attendanceRoute from './routes/attendanceRoute';
import uploadRoute from './routes/uploadRoute';
import chatRoute from './routes/chatRoute';
import liveChatRoute from './routes/liveUserRoute';
import imageRouter from './routes/imageRoute';

const mongodbUrl = config.MONGODB_URL;
const conn = mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((error) => console.log(error.reason))

const app = express();

conn.then(() => {
  console.log('Connected to database: GridApp');
}, (err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/products", productRoute);

app.use("/api/uploads", imageRouter());

app.use("/api/users", userRoute);

app.use("/api/order", orderRoute);

app.use("/api/category", categoryRoute);

app.use("/api/brand", brandRoute);

app.use("/api/zone", zoneRoute);

app.use("/api/payment", paymentRoute);

app.use("/api/delivery", deliveryRoute);

app.use("/api/employee", employeeRoute);

app.use("/api/attendance", attendanceRoute);

app.use("/api/chat", chatRoute);

app.use("/api/live", liveChatRoute);

//app.use("/api/image", imageRoute);

//app.use('/uploads', express.static(path.join(__dirname, '/../frontend/uploads')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({ origin: '*' }));

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '/../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(config.PORT ? config.PORT : 5000, () => {
  console.log("Server started at http://localhost:5000");
});
