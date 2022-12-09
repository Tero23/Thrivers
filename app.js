require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");
const projectRouter = require("./routes/projectRoutes");
const memberRouter = require("./routes/memberRoutes");
const internshipRouter = require("./routes/internshipRoutes");
const applicationRouter = require("./routes/applicationRoutes");
const contactInfoRouter = require("./routes/contactInfoRoutes")

// Start express app
const app = express();

// Global Middlewares
// helmet secures our express app by setting some http headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Limit requests from same API
const limiter = rateLimit({
  // 100 requests with the same ip in 1 hour
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

// Body parser, reading data from body into req.body and there is limit of 10kb.
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Routes
app.use("/api/v1/products", projectRouter);
app.use("/api/v1/members", memberRouter);
app.use("/api/v1/internships", internshipRouter);
app.use("/api/v1/contactInfos", contactInfoRouter);
app.use("/api/v1/applications", applicationRouter);

app.all("*", (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
