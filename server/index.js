import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";


// Import configurations and middleware
import { connectDB } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

// Import routes
// import {packageRoutes} from './routes/packageRoutes.js';
// import {enquiryRoutes} from './routes/enquiryRoutes.js';

// Import utilities
// import { seedPackages } from './utils/seedData.js';
import { cityRouter } from './routes/city.routes.js';
import { tourRouter } from './routes/tour.routes.js';
import { reviewRouter } from './routes/review.routes.js';
import { contactRouter } from './routes/contact.routes.js';

import { adminRouter } from './routes/admin.routes.js';

dotenv.config();

console.log("in app,js")

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to database
connectDB()


// Middleware
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "https://www.sandctours.com"],
  credentials: true,
  samesite: 'none',
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
})


// apis

app.use("/api/v1/city", cityRouter)
app.use("/api/v1/tour", tourRouter)
app.use("/api/v1/review", reviewRouter)
app.use('/api/v1/contact', contactRouter);

// admin apis

app.use("/api/v1/admin", adminRouter);
