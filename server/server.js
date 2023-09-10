/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const inboundOrderRouter = require("./routes/inboundOrderRoutes");
const productCategoryRouter = require("./routes/productCategoryRoutes");
const warehouseRouter = require("./routes/warehouseRoutes");
const buyerOrderRouter = require("./routes/buyerOrderRoutes");
const attributeRouter = require("./routes/attributeRoutes");
const stockRouter = require("./routes/stockRoutes");

const app = express();

/* 
* Serve static files from the server directory. `server/uploads` to be specific. 
* This means that any files in the server directory can be accessed by the client through a web browser.
* The __dirname variable is a global variable in Node.js that contains the absolute path of the directory containing the currently executing file. 
*/
app.use('/uploads', express.static(path.join(__dirname + "/uploads")));

/* 
* Tell Express.js to trust the headers set by your proxy 
* so that we can access req.protocol and req.hostname
*/ 
app.set('trust proxy', true);

app.use(cookieParser());

// eslint-disable-next-line no-undef
const SERVER_PORT = process.env.SERVER_PORT;
const CORS_WHITELIST = [
  // eslint-disable-next-line no-undef
  `http://localhost:${process.env.SERVER_PORT}`,
  // eslint-disable-next-line no-undef
  `http://localhost:${process.env.CLIENT_MALL_PORT}`,
  // eslint-disable-next-line no-undef
  `http://localhost:${process.env.CLIENT_WHADMIN_PORT}`
];

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  cors({
    origin: (origin, callback) => {
      if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/inbound-order", inboundOrderRouter);
app.use("/api/product-category", productCategoryRouter);
app.use("/api/warehouse", warehouseRouter);
app.use("/api/buyer-order", buyerOrderRouter);
app.use("/api/attribute", attributeRouter);
app.use("/api/stock", stockRouter);

app.get("/", (req, res) => {
  return res.json("Server is running");
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on ${SERVER_PORT}`);
});

module.exports = app;
