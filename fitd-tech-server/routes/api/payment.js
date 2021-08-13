import express from 'express';
import auth from '../../middleware/auth';
const router = express.Router();
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST);

//Model

import User from '../../models/user';

//========================================
//         Payment Api
// Author: Aiden Kim, Donghyun(Dean) Kim
//========================================

/*
 * @route     POST   api/payment/
 * @desc      Payment Process
 * @access    Private
 *
 */

router.post('/', auth, async (req, res) => {
  console.log(`+++++Payment req.body`, req.body);
  let { amount, id, membershipId } = req.body;
  const user = req.user;
  let intAmount = parseInt(amount);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: intAmount,
      currency: 'CAD',
      description: 'fitd company',
      payment_method: id,
      confirm: true,
    });
    console.log('Payment', payment);

    const paidUser = await User.findByIdAndUpdate(
      user._id,
      { isMembership: membershipId },
      { new: true }
    );

    res.json({
      message: 'Payment successful',
      success: true,
      user: paidUser,
    });
  } catch (error) {
    console.log('Error', error);
    res.json({
      message: 'Payment failed',
      success: false,
    });
  }
});

export default router;
