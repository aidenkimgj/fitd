import express from 'express';
const router = express.Router();
import auth from '../../middleware/auth';

// Model
import NewCoach from '../../models/newCoach';
import User from '../../models/user';

//========================================
//         Schedule Api
// Author: Aiden Kim, Donghyun(Dean) Kim
//========================================

/*
 * @route     POST   api/schedule/book
 * @desc      Set schedule
 * @access    Private
 *
 */

router.post('/book', auth, async (req, res, next) => {
  const { coachId, selectedEvents } = req.body;
  const user = req.user;

  try {
    const bookedUser = await User.findByIdAndUpdate(
      user._id,
      { events: [...user.events, ...selectedEvents] },
      { new: true }
    );

    selectedEvents.map(
      async event =>
        await NewCoach.updateOne(
          { _id: coachId, 'events.id': event.id },
          { $set: { 'events.$.booked': true } }
        )
    );

    res.json({ message: 'Booking Completed', success: true, user: bookedUser });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/*
 * @route     POST   api/schedule/manage-coach-schedule
 * @desc      Update schedule for coach
 * @access    Private
 *
 */

router.post('/manage-coach-schedule', auth, async (req, res, next) => {
  const { changedEvents } = req.body;
  const user = req.user;

  if (req.user.role !== 1)
    res.status(400).json({ error: true, message: 'Unauthorized' });

  try {
    await NewCoach.updateOne(
      { user: user._id },
      { $set: { events: changedEvents } }
    );

    res.json({ message: 'Your schedule has been updated', success: true });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

export default router;
