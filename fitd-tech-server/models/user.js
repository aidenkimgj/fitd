import mongoose from 'mongoose';
import moment from 'moment';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { forgot, newCoach } from '../form/email.form';
const saltRounds = 10;

//=================================
//         User Model
// Author: Aiden Kim, Donghyun(Dean) Kim
//=================================
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minglength: 5,
  },
  lastName: {
    type: String,
    maxlength: 50,
  },
  // role: 0 - General User, 1 - Coach, 2 - Admin, 3 - pending request to be a coach
  role: {
    type: Number,
    default: 0,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  //Google login user - true or not
  oauth: {
    type: Boolean,
    default: false,
  },
  recentlyViewed: {
    type: Array,
    default: [],
  },
  createAt: {
    type: Date,
    default: moment().format('MM-DD-YYYY hh:mm:ss'),
  },
  //default:0, starter:1, Gold:2, Diamond:3
  isMembership: {
    type: Number,
    default: 0,
  },
  contentReviews: [
    // For delete with a comment which it locates underneath the post
    {
      content_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
      },
      review_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    },
  ],
  coachReviews: [
    {
      coach_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewCoach',
      },
      review_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    },
  ],
  contents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',
    },
  ],
  events: {
    type: Array,
    default: [],
  },
});

//=================================
//   User Model Schema Function
//   Author: Donghyun(Dean) Kim
//=================================

// To check whether password is modeified or not, if password is chaged, password will be encrypted
// Trigger -> check whether password was changed or not -> if it's modified encrypt and return next() or just return next()
userSchema.pre('save', function (next) {
  let user = this;

  if (user.isModified('password')) {
    // console.log('password changed')
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// compare the password, user typed in with password in the db  (parameters: Plain Password /Return: user boolean isMatch)
// Trigger -> get plain password -> decrypt and compare -> return isMath(boolean)
userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//Generate Jeson Web Token (exp: 1hour) (Return: user info callback)
// Trigger -> just generate jwt token and store to the DB -> reutrn call back with user info
userSchema.methods.generateToken = function (cb) {
  let user = this;
  let oneHour = moment().add(1, 'hour').valueOf() / 1000; //expired time 1 hour
  let token = jwt.sign(
    { _id: user._id.toHexString(), exp: oneHour },
    process.env.JWT_SECRET
  );

  user.tokenExp = oneHour;
  user.token = token;
  user.save((err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

// Authenticate Token by using (parameters:token /Return: user info)
// jwt: jwt.verify
// random(Forgot password): compare a token with the token in the db (This token was stored when user type in a email in on the page of forgot password)
userSchema.statics.findByToken = function (data, cb) {
  let user = this;
  let token = data.token;
  let type = data.type;

  if (type == 'jwt') {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decode) {
      user.findOne({ _id: decode, token: token }, function (err, user) {
        if (err) return cb(err);
        cb(null, user);
      });
    });
  } else if (type == 'random') {
    user.findOne({ token: token }, function (err, user) {
      if (err) return cb(err);
      if (user.tokenExp >= moment().valueOf()) {
        cb(null, user);
      } else {
        cb(null, null);
      }
    });
  } else {
    cb(null, null);
  }
};

userSchema.methods.sendEmail = async function (type, cb) {
  let user = this;
  //if email exists, request refreshToken to access google OAuth
  const oAuth2Client = new google.auth.OAuth2(
    process.env.FORGOT_OAUTH_EMAIL_CLIENT_ID,
    process.env.FORGOT_OAUTH_EMAIL_SECRET,
    process.env.FORGOT_OAUTH_REDIRECT_URI
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.FORGOT_OAUTH_EMAIL_REFRESH_TOKEN,
  });

  // Generate Token to access the page to reset password
  const token = crypto.randomBytes(20).toString('hex');

  try {
    //generate access token from google
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        type: 'OAuth2',
        user: process.env.WEBSITE_EMAIL_ADDRESS,
        clientId: process.env.FORGOT_OAUTH_EMAIL_CLIENT_ID,
        clientSecret: process.env.FORGOT_OAUTH_EMAIL_SECRET,
        refreshToken: process.env.FORGOT_OAUTH_EMAIL_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    //Main contents
    let mailOptions;
    if (type === 'forgot')
      mailOptions = forgot(user.firstName, token, user.email);
    else if (type === 'newCoach')
      mailOptions = newCoach(user.firstName, token, user.email);
    const result = transporter.sendMail(mailOptions);
    return cb(null, result, token);
  } catch (err) {
    return cb(err, null, null);
  }
};

const User = mongoose.model('User', userSchema);

export default User;
