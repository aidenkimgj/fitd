import mongoose from 'mongoose';
import moment from 'moment';

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    // Same as not null
    required: true,
  },
  date: {
    type: String,
    default: moment().format('MM-DD-YYYY hh:mm:ss'),
  },
  rating: {
    type: Number,
    default: 0,
  },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NewCoach',
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // It can prevent overflow of the database by allowing user IDs to be entered together when comment are generated.
  creatorName: { type: String },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
