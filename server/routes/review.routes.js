import express from 'express';
import { 
  createReview, 
  getAllReviews, 
  getActiveReviews, 
  getReviewById, 
  updateReview, 
  deleteReview, 
  toggleReviewStatus,
  updateReviewOrder,
  reorderReviews
} from '../controllers/review.controller.js';
import upload from '../utils/multer.js';
import {pinMiddleware} from '../middleware/pin.middleware.js';

const reviewRouter = express.Router();

// Public routes
reviewRouter.get('/active', getActiveReviews);
reviewRouter.get('/:id', getReviewById);

// Admin routes (protected)
reviewRouter.post('/create', upload.single('image'), createReview);
reviewRouter.get('/', getAllReviews);
reviewRouter.put('/:id', upload.single('image'), pinMiddleware, updateReview);
reviewRouter.delete('/:id', pinMiddleware, deleteReview);
reviewRouter.patch('/:id/toggle', toggleReviewStatus);
reviewRouter.patch('/admin/order', updateReviewOrder);
reviewRouter.post('/admin/reorder', reorderReviews);

export { reviewRouter }; 