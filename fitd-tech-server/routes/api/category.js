import express from 'express';
const router = express.Router();

// Model
import Category from '../../models/category';

//========================================
//         Category Api
// Author: Aiden Kim, Donghyun(Dean) Kim
//========================================

/*
 * @route    GET api/category/
 * @desc     get all categoryName
 * @access   Public
 *
 */

router.get('/', async (req, res) => {
  try {
    const result = await Category.find();
    res.json(result);
  } catch (e) {
    console.error(e);
  }
});

/*
 * @route    GET api/category/:categoryName
 * @desc     get contents in the single category
 * @access   Public
 *
 */

router.get('/:categoryName', async (req, res, next) => {
  try {
    const result = await Category.findOne(
      {
        categoryName: {
          $regex: req.params.categoryName,
          $options: 'i',
        },
      },
      'contents'
    ).populate({ path: 'contents' });
    console.log(result, 'Category Find result');
    res.json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

export default router;
