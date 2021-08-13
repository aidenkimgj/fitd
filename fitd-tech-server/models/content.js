import moment from 'moment';
import mongoose from 'mongoose';

//========================================
//         Content Model
// Author: Aiden Kim, Donghyun(Dean) Kim
//========================================

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  via: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  fileUrl: {
    type: String,
  },
  views: {
    type: Number,
    default: -2,
  },
  date: {
    type: String,
    default: moment().format('MM-DD-YYYY hh:mm:ss'),
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Content = mongoose.model('Content', contentSchema);

export default Content;
