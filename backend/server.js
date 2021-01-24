import express from "express";
import config from "./config";
import path from 'path';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from 'morgan'
import cors from 'cors';
import methodOverride from 'method-override'
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
import assignmentRoute from './routes/assignmentRoute';
import chatRoute from './routes/chatRoute';
import liveChatRoute from './routes/liveUserRoute';
import imageRoute from './routes/imageRoute';
import controlsRoute from './routes/controlsRoute';
import slidesRoute from './routes/slidesRoute';
import stylesRoute from './routes/stylesRoute';
import http from 'http'
import socketIo from 'socket.io'

/*import wifi from 'node-wifi'

wifi.init({
  iface: null // network interface, choose a random wifi interface if set to null
});

var wifiAvailable

wifi.scan(function (err, networks) {
  if (err) {
    console.log(err);
  } else {
    //console.log(networks);
    wifiAvailable = networks
    wifiAvailable.map(wf => {
      if (wf.ssid === 'OBEID')
        wifiAvailable = wf
      return
    })
    //console.log(wifiAvailable)
  }
})

wifi.getCurrentConnections(function (err, currentConnections) {
  if (err) {
    console.log(err);
  } else console.log(currentConnections[0])
})

wifi.connect({ ssid: "OBEID", password: "12345678900" }, function (err) {
  if (err) {
    console.log(err)
  } else console.log("Connected")
})

wifi.connect({ ssid: "Hadi Obeid", password: "Hassan@obied@44" }, function (err) {
  if (err) {
    console.log(err)
  } else console.log("Connected")
})*/

///////////////////////////////////////////////////////

const mongodbUrl = config.MONGODB_URL;

/*var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  console.log("db connect");
  db.dropCollection("styles", function (err, result) {
    if (err) {
      console.log("error delete collection");
    } else {
      console.log("delete collection success");
    }
  });
});*/
mongoose.connect(mongodbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .catch((err) => console.log(err.reason))
  .then((db) => console.log('Connected to database: GridApp'))

const app = express()
const server = http.createServer(app)
const io = socketIo(server)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(cors())

io.on('connection', (socket) => {
  console.log('new client connected');
});

app.use("/api/products", productRoute);

app.use("/api/controls", controlsRoute);

app.use("/api/uploads", imageRoute);

app.use("/api/users", userRoute);

app.use("/api/order", orderRoute);

app.use("/api/category", categoryRoute);

app.use("/api/brand", brandRoute);

app.use("/api/zone", zoneRoute);

app.use("/api/payment", paymentRoute);

app.use("/api/delivery", deliveryRoute);

app.use("/api/employee", employeeRoute);

app.use("/api/attendance", attendanceRoute);

app.use("/api/assignment", assignmentRoute);

app.use("/api/chat", chatRoute);

app.use("/api/live", liveChatRoute);

app.use("/api/slides", slidesRoute)

app.use("/api/styles", stylesRoute)

//app.use('/api/uploads/image', express.static(path.join(__dirname, '/../frontend/uploads')));

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({ origin: '*' }));
app.use(logger('dev'));*/

//app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/../frontend/build')));
/*app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});*/

app.listen(config.PORT, () => {
  console.log("Server started at http://localhost:5000")
})