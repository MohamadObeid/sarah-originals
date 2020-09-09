import express from "express";
import config from "./config";
import path from 'path';
import mongoose from "mongoose";
import bodyParser from "body-parser";
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

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json());

app.use("/api/products", productRoute);

app.use("/api/uploads", uploadRoute);

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

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

app.use(express.static(path.join(__dirname, '/../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(config.PORT || 5000, () => {
  console.log("Server started at http://localhost:config.PORT||5000");
});
