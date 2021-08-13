import express from 'express';
// import async from 'async';
import auth from '../../middleware/auth';
import { OAuth2Client } from 'google-auth-library';
// Model
import User from '../../models/user';
import NewCoach from '../../models/newCoach';
import moment from 'moment';
import { generateUploadURL } from '../../middleware/s3';

// import Product from '../../models/product';
// import Payment from '../../models/payment';

const router = express.Router();
//=================================
//             User
// Author: Aiden Kim, Donghyun(Dean) Kim
//=================================

// Autenticate a token and then return user's info if it's valid
// Trigger -> authenticate user's jwt on the auth(middleware) ->if it's valid return user's info and refresh token
router.get('/auth', auth, (req, res) => {
  //Token Refresh
  req.user.generateToken((err, user) => {
    if (err) return res.status(400).send(err);
    res.cookie('w_authExp', user.tokenExp);
    res
      .cookie('w_auth', user.token)
      .status(200)
      .json({
        _id: req.user._id,
        isAdmin: req.user.role === 2 ? false : true,
        isAuth: true,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history,
        isMembership: req.user.isMembership,
        events: req.user.events,
      });
  });
});

// Register page
// Get a user's info and then store it
// Validation - mongo DB will return error by using model if it has some wroing validation
// Trigger -> get user's info and then store it to the DB -> reutrn success:true
router.post('/register', (req, res) => {
  console.log('register: ', req.body);
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

//Login function (Receive: email and plain password/ Return Success(boolean),usreId and cookie(token, exp))
//Trigger -> get email ans password -> comapre with using scheman method -> if it's matched, generate a token -> reutrn Success(boolean),usreId and cookie(token, exp)
router.post('/login', (req, res) => {
  console.log(req.body.email);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found',
      });
    //Compare password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: 'Wrong password' });
      //Generate Token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('w_authExp', user.tokenExp);
        res.cookie('w_auth', user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

// logout (Receive: user ID / return success(boolean))
// Trigger -> get user id -> delet token and token expire time in the DB -> return success(boolean)
router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: '', tokenExp: '' },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

// Google login (Receive: access token / Return: User info)
// Trigger -> receive:token -> if new user, store to db and return user info or just return user info -> return userinfo
router.post('/google', async (req, res) => {
  console.log(req.body);
  const client = new OAuth2Client(process.env.LOGIN_OAUTH_CLIENT_ID);
  //verify Token
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.LOGIN_OAUTH_CLIENT_ID,
  });

  // get user info from google
  const googleUserInfo = ticket.getPayload();

  //Search user info
  User.findOne({ email: googleUserInfo.email }, (err, user) => {
    //if user info doesn't exists
    if (!user) {
      const newUser = new User({
        firstName: googleUserInfo.given_name,
        email: googleUserInfo.email,
        password: googleUserInfo.sub,
        lastName: googleUserInfo.family_name,
        image: googleUserInfo.picture,
        oauth: true,
      });

      newUser.save((err, doc) => {
        console.log(err);
        if (err) return res.json({ success: false, err });
        newUser.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie('w_authExp', user.tokenExp);
          res.cookie('w_auth', user.token).status(200).json({
            loginSuccess: true,
            userId: user._id,
          });
        });
      });
    }
    //if user info exists, just compare password(sub info)
    else {
      user.comparePassword(googleUserInfo.sub, (err, isMatch) => {
        if (!isMatch)
          return res.json({ loginSuccess: false, message: 'Wrong google sub' });

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie('w_authExp', user.tokenExp);
          res.cookie('w_auth', user.token).status(200).json({
            loginSuccess: true,
            userId: user._id,
          });
        });
      });
    }
  });
});

// fogot (Receive: email / Return: success(boolean) and err message)
// receive: email, user want to find -> search the email and if it exists, return and send email with token (1hour validation)or not, send err with err message
router.post('/forgot', async (req, res) => {
  // find user by using email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        success: false,
        message: "Email doesn't exist, Please try again.",
      });
    if (user.oauth) {
      return res.json({
        success: false,
        message:
          'This user is registered as a Google user, please contact Google OAuth team.',
      });
    }

    //Send Email
    user.sendEmail('forgot', (err, result, token) => {
      user.tokenExp = moment().add(1, 'hour').valueOf(); //expired time 1 hour
      user.token = token;
      user.save(function (err, user) {
        if (err) return res.status(400).json({ success: false, err });
      });
      if (result) {
        return res.json({ success: true });
      } else res.status(400).json({ success: false, message: err.message });
    });
  });
});

// Check token and then reset password / receive: token and email, send: success:true
router.post('/resetpw', auth, async (req, res) => {
  let user = req.user;
  user.password = req.body.password;
  user.save(function (err, user) {
    if (err) res.status(400).json({ error: true });
    res.status(200).json({ success: true, user: user });
  });
});

//Elevate user to coatch
//Receive: UserID, Return - updated user info
router.post('/approve-coach', auth, async (req, res) => {
  //Admin authenticate
  if (req.user.role !== 2)
    res.status(400).json({ error: true, message: 'Unauthorized' });
  let _id = req.body._id;
  console.log('id값', _id);
  //Find the application

  try {
    const modified_user = await User.findByIdAndUpdate(
      _id,
      { role: 1 },
      { new: true }
    );

    const coach = await NewCoach.findOne({ user: _id });

    await NewCoach.findByIdAndUpdate(
      coach._id,
      { isApproved: true },
      { new: true }
    );

    res.status(200).json({ success: true, user: modified_user });
  } catch (e) {
    res.status(400).json({ error: true, message: "User doesn't exist." });
  }

  // NewCoach.find({ user: _id }, function (err, app) {
  //   //Put the application to the new coach
  //   User.findByIdAndUpdate(
  //     _id,
  //     { $set: { role: 1, coach: app } },
  //     { new: true },
  //     function (err, user) {
  //       if (err)
  //         return res
  //           .status(400)
  //           .json({ error: true, message: "User doesn't exist." });
  //       res.status(200).json({ success: true, user: user });
  //     }
  //   );
  // })
});

// return authenticated url from s3.
router.get('/s3Url/:filename', async (req, res) => {
  const filename = req.params.filename;
  const url = await generateUploadURL(filename);
  res.send({ url });
});

//Request elevation user to coatch (change the user's role to 3(pending request))
//Return - success: true, new userinfo
router.post('/request-coach', auth, async (req, res) => {
  //Check you are user
  let user = req.user;
  if (user.role !== 0)
    return res
      .status(400)
      .json({ error: true, message: 'You are not just a user' });

  // //save coach appplication
  req.body.user = user._id;

  //Send a notification to a admin
  user.sendEmail('newCoach', (err, result, token) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, message: 'Fail to send Email' });
    const newCoach = new NewCoach(req.body);

    newCoach.token = token;
    newCoach.fileUrl = req.body.uploadFile;

    newCoach.save((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
    });
  });

  //change the user's role
  user.role = 3;
  user.save(function (err, user) {
    if (err) return res.status(400).json({ error: true });
    res.status(200).json({ success: true });
  });
});

//Return a new coach application / Receive - token
router.post('/getApplication', auth, async (req, res) => {
  //Check Authorization
  let user = req.user;
  if (user.role !== 2 && user.role !== 1)
    res.status(400).json({ error: true, message: 'Unauthorized' });
  const allApp = await NewCoach.find().lean();
  res.status(200).json({ success: true, app: allApp });
});

//Return user list to Admin
//Receive - option: if(option == "all",
//                  option == "general",
//                  option == "coach",
//                  option == "pending")
//Receive, skip(default:0) and limit(default:20) number // Return - user list by the option
router.post('/userlist', auth, async (req, res) => {
  //Admin authenticate
  let user = req.user;
  if (user.role !== 2)
    res.status(400).json({ error: true, message: 'Unauthorized' });
  let option = req.body.option;

  //Return 20 users only
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  switch (option) {
    case 'all': {
      const users = await User.find().lean();
      if (!users) return res.status(400).json({ success: false, err });
      return res.status(200).json({
        success: true,
        users: users,
      });
      //skipping and limitting
      // .skip(skip)
      // .limit(limit)
      // .exec((err, users) => {
      //   if (err) return res.status(400).json({ success: false, err })
      //   return res.status(200).json({
      //     success: true, users: users
      //   })
      // })
      break;
    }
    case 'general': {
      const users = await User.find({ role: 0 }).lean();
      if (!users) return res.status(400).json({ success: false, err });
      return res.status(200).json({
        success: true,
        users: users,
      });
      // .skip(skip)
      // .limit(limit)
      // .exec((err, users) => {
      //   if (err) return res.status(400).json({ success: false, err })
      //   return res.status(200).json({
      //     success: true, users: users
      //   })
      // })
      break;
    }
    case 'coach': {
      const users = await User.find({ role: 1 }).lean();
      if (!users) return res.status(400).json({ success: false, err });
      return res.status(200).json({
        success: true,
        users: users,
      });
      // .skip(skip)
      // .limit(limit)
      // .exec((err, users) => {
      //   if (err) return res.status(400).json({ success: false, err })
      //   return res.status(200).json({
      //     success: true, users: users
      //   })
      // })
      break;
    }
    case 'pending': {
      const users = await User.find({ role: 3 }).lean();
      if (!users) return res.status(400).json({ success: false, err });
      return res.status(200).json({
        success: true,
        users: users,
      });
      break;
    }
  }
});

router.get('/coachlist', async (req, res) => {
  const users = await User.find({ role: 1 }).lean();
  if (!users) return res.status(400).json({ success: false, err });
  return res.status(200).json({
    success: true,
    users: users,
  });
});

router.delete('/deleteuser/:id', auth, async (req, res) => {
  //Admin authenticate
  let user = req.user;
  if (user.role !== 2)
    res.status(400).json({ error: true, message: 'Unauthorized' });

  const _id = req.params.id;
  User.findOneAndDelete({ _id: _id }, (err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    if (doc) {
      return res.status(200).json({
        success: true,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'cannot find the user',
      });
    }
  });
});

export default router;
