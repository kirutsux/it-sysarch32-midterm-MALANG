import express from "express";
const app = express();
import productRoutes from "./api/routes/products.js";
import orderRoutes from "./api/routes/orders.js";
import userRoutes from "./api/routes/user.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://kirutsu:" + 
  process.env.MONGO_ATLAS_PW + 
  "@kurtz.pc5yl4f.mongodb.net/?retryWrites=true&w=majority&appName=kurtz",
  {}
);
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Routes Handling Requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
