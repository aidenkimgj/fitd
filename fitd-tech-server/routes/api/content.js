import express from 'express';
const router = express.Router();
import moment from 'moment';
import '@babel/polyfill';
import { isNullOrUndefined } from 'util';
import auth from '../../middleware/auth';

// Model
import Content from '../../models/content';
import User from '../../models/user';
import Category from '../../models/category';
import Review from '../../models/review';

//========================================
//         Content Apis
// Author: Aiden Kim, Donghyun(Dean) Kim
//========================================

/*
 * @route     GET   api/content/
 * @desc      GET all contnets
 * @access    Public
 *
 */

router.get('/', async (req, res) => {
  try {
    const contents = await Content.find();
    res.json(contents);
  } catch (e) {
    console.error(e);
  }
});

/*
 * @route     POST   api/content/
 * @desc      Create a content
 * @access    Private
 *
 */

router.post('/', auth, async (req, res, next) => {
  try {
    const {
      title,
      description,
      details,
      viaSelected,
      duration,
      typeSelected,
      contentPrice,
      category,
      uploadFile
    } = req.body;

    const newContent = await Content.create({
      title,
      description,
      detail: details.contents,
      via: viaSelected,
      type: typeSelected,
      price: contentPrice,
      fileUrl: uploadFile,
      duration,
      creator: req.user.id,
      date: moment().format('MM-DD-YYYY hh:mm:ss'),
    });

    // find category from database
    const existedCategory = await Category.findOne({
      categoryName: category,
    });

    console.log(existedCategory, 'Find Result category');
    // the category does not exist in the database.
    if (isNullOrUndefined(existedCategory)) {
      // create new category
      const newCategory = await Category.create({
        categoryName: category,
      });
      // insert data into database
      await Content.findByIdAndUpdate(newContent._id, {
        // $push is that it can put addition value in the exist array
        $push: { category: newCategory._id },
      });
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: { contents: newContent._id },
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: { contents: newContent._id },
      });

      // the category exist in the database
    } else {
      await Content.findByIdAndUpdate(newContent._id, {
        // For the content model, the category was found in a particular content model, so $push was not used.
        category: existedCategory._id,
      });
      await Category.findByIdAndUpdate(existedCategory._id, {
        $push: { contents: newContent._id },
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: { contents: newContent._id },
      });
    }
    res.json(newContent);
    // return res.redirect(`/api/content/${newContent._id}`);
  } catch (e) {
    console.error(e);
  }
});

// /*
//  * @route     GET   api/content/:path
//  * @desc      Get each content detail
//  * @access    Public
//  *
//  */

// router.get('/:path', async (req, res, next) => {
//   try {
//     const content = await Content.findOne(req.params.path)
//       .populate('creator', 'name') // first value is path and second value is select
//       .populate({ path: 'category', select: 'categoryName' });
//     // .exec();
//     content.views += 1;
//     content.save();
//     console.log(content);
//     res.json(content);
//   } catch (e) {
//     console.error(e);
//     next(e);
//   }
// });

/*
 * @route    GET api/content/:path/edit
 * @desc     Get content that need to be edited
 * @access   Private
 *
 */
router.get('/:id/edit', auth, async (req, res, next) => {
  try {
    const content = await Content.findById(req.params.id).populate(
      'creator',
      'firstName'
    );
    res.json(content);
  } catch (e) {
    console.error(e);
  }
});

/*
 * @route    POST api/content/:path/edit
 * @desc     Edit content
 * @access   Private
 *
 */
router.post('/:id/edit', auth, async (req, res, next) => {
  console.log(req, 'api/content/:path/edit');

  const {
    body: {
      id,
      title,
      description,
      details,
      viaSelected,
      duration,
      typeSelected,
      contentPrice,
      category,
    },
  } = req;

  try {
    const modified_content = await Content.findByIdAndUpdate(
      id,
      {
        title,
        description,
        duration,
        detail: details.contents,
        via: viaSelected,
        type: typeSelected,
        price: contentPrice,
        fileUrl: details.fileUrl,
        date: moment().format('MM-DD-YYYY hh:mm:ss'),
      },
      { new: true }
    );
    console.log(modified_content, 'edit modified');
    res.json(modified_content);
    // res.redirect(`/api/content/${modified_content.path}`);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/*
 * @route    Delete api/content/:path
 * @desc     Delete a content
 * @access   Private
 *
 */
router.delete('/:id', auth, async (req, res) => {
  await Content.deleteMany({ _id: req.params.id });
  await Review.deleteMany({ content: req.params.id });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      contents: req.params.id,
      reviews: { content_id: req.params.id },
    },
  });
  const CategoryUpdateResult = await Category.findOneAndUpdate(
    { contents: req.params.id },
    { $pull: { contents: req.params.id } },
    { new: true }
  );

  if (CategoryUpdateResult.contents.length === 0) {
    await Category.deleteMany({ _id: CategoryUpdateResult });
  }
  return res.json({ success: true });
});

export default router;
