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
const internshipApplicationRouter = require("./routes/internshipApplicationRoutes");
const contactInfoRouter = require("./routes/contactInfoRoutes");
const mentorshipApplicationRouter = require("./routes/mentorshipApplicationRoutes");
const mentorshipRouter = require("./routes/mentorshipRoutes");
const stripeRouter = require("./routes/stripeRoutes");
const refundRouter = require("./routes/refundRoutes");

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
// In case needed in the future
app.use(cookieParser());

// Routes
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/members", memberRouter);
app.use("/api/v1/internships", internshipRouter);
app.use("/api/v1/contactInfos", contactInfoRouter);
app.use("/api/v1/internshipApplications", internshipApplicationRouter);
app.use("/api/v1/mentorshipApplications", mentorshipApplicationRouter);
app.use("/api/v1/mentorships", mentorshipRouter);
app.use("/api/v1/stripe", stripeRouter);
app.use("/api/v1/refunds", refundRouter);

// If you hit a wrong route
app.all("*", (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
