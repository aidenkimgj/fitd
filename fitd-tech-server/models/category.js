import mongoose from 'mongoose';

//========================================
//         Category Model
// Author: Aiden Kim, Donghyun(Dean) Kim
//========================================

// Create Shema
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    default: 'Unclassified',
  },
  // Making a array because multiple contents can be posted in a single category.
  contents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',
    },
  ],
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
