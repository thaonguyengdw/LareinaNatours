const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRouter");

const userRouter = require("./routes/userRouter");

//Result of calling express
const app = express();

// 1) Middlewares
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log("Hello from then middleware 😊 ");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) Routes
app.use("/api/v1/tours", tourRouter); // This tourRouter here is a real middleware
app.use("/api/v1/users", userRouter);

module.exports = app;
